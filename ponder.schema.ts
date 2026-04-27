import { onchainTable } from "ponder";

export const user = onchainTable("user", (t) => ({
  address: t.hex().primaryKey(),
  voteCount: t.integer().notNull().default(0),
  reportCount: t.integer().notNull().default(0),
  firstSeenAt: t.bigint().notNull(),
  lastSeenAt: t.bigint().notNull(),
}));

export const scamVote = onchainTable("scam_vote", (t) => ({
  id: t.text().primaryKey(),
  reporter: t.hex().notNull(),
  targetId: t.hex().notNull(),
  targetType: t.integer().notNull(),
  reasonHash: t.hex().notNull(),
  isScam: t.boolean().notNull(),
  blockNumber: t.bigint().notNull(),
  timestamp: t.bigint().notNull(),
  transactionHash: t.hex().notNull(),
}));

export const scamReport = onchainTable("scam_report", (t) => ({
  id: t.text().primaryKey(),
  reporter: t.hex().notNull(),
  reasonHash: t.hex().notNull(),
  isScam: t.boolean().notNull(),
  blockNumber: t.bigint().notNull(),
  timestamp: t.bigint().notNull(),
  transactionHash: t.hex().notNull(),
}));
