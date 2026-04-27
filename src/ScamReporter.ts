import { ponder } from "ponder:registry";
import { scamVote, scamReport, user } from "../ponder.schema";

async function upsertUser(context: any, address: `0x${string}`, timestamp: bigint) {
  const existing = await context.db.find(user, { address });
  if (existing) {
    await context.db.update(user, { address }).set({
      voteCount: existing.voteCount,
      reportCount: existing.reportCount,
      lastSeenAt: timestamp,
    });
    return existing;
  }
  await context.db.insert(user).values({
    address,
    voteCount: 0,
    reportCount: 0,
    firstSeenAt: timestamp,
    lastSeenAt: timestamp,
  });
  return null;
}

ponder.on("ScamReporter:ScamVoteSubmitted", async ({ event, context }) => {
  const { reporter, targetId, targetType, reasonHash, isScam } = event.args;

  const existing = await upsertUser(context, reporter, event.block.timestamp);

  await context.db.insert(scamVote).values({
    id: event.id,
    reporter,
    targetId,
    targetType: Number(targetType),
    reasonHash,
    isScam,
    blockNumber: event.block.number,
    timestamp: event.block.timestamp,
    transactionHash: event.transaction.hash,
  });

  if (existing) {
    await context.db.update(user, { address: reporter }).set({
      voteCount: existing.voteCount + 1,
    });
  } else {
    await context.db.update(user, { address: reporter }).set({
      voteCount: 1,
    });
  }
});

ponder.on("ScamReporter:ScamReportSubmitted", async ({ event, context }) => {
  const { reporter, reasonHash, isScam } = event.args;

  const existing = await upsertUser(context, reporter, event.block.timestamp);

  await context.db.insert(scamReport).values({
    id: event.id,
    reporter,
    reasonHash,
    isScam,
    blockNumber: event.block.number,
    timestamp: event.block.timestamp,
    transactionHash: event.transaction.hash,
  });

  if (existing) {
    await context.db.update(user, { address: reporter }).set({
      reportCount: existing.reportCount + 1,
    });
  } else {
    await context.db.update(user, { address: reporter }).set({
      reportCount: 1,
    });
  }
});
