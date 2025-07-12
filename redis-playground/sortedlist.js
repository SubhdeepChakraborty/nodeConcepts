import { client } from "./client.js";


const demoSortedSet = async () => {
  try {
    console.log("=== REDIS SORTED SET DEMO ===\n");

    // 1. ZADD - Add members with scores
    console.log("1. Adding members to leaderboard:");
    await client.zadd("leaderboard", [
      100,
      "alice",
      85,
      "bob",
      92,
      "charlie",
      78,
      "diana",
      95,
      "eve",
    ]);
    console.log("Added 5 players to leaderboard\n");

    // 2. ZRANGE - Get members by rank (ascending order)
    console.log("2. Top players (lowest to highest score):");
    const ascendingOrder = await client.zrange("leaderboard", 0, -1);
    console.log(ascendingOrder);
    console.log();

    // 3. ZREVRANGE - Get members by rank (descending order)
    console.log("3. Top players (highest to lowest score):");
    const descendingOrder = await client.zrevrange("leaderboard", 0, -1);
    console.log(descendingOrder);
    console.log();

    // 4. ZRANGE with WITHSCORES - Get members with their scores
    console.log("4. Players with scores (ascending):");
    const withScores = await client.zrange("leaderboard", 0, -1, "WITHSCORES");
    console.log(withScores);
    console.log();

    // 5. ZREVRANGE with WITHSCORES - Get top 3 players with scores
    console.log("5. Top 3 players with scores:");
    const top3 = await client.zrevrange("leaderboard", 0, 2, "WITHSCORES");
    console.log(top3);
    console.log();

    // 6. ZSCORE - Get score of specific member
    console.log("6. Get Alice's score:");
    const aliceScore = await client.zscore("leaderboard", "alice");
    console.log(`Alice's score: ${aliceScore}\n`);

    // 7. ZRANK - Get rank of member (0-based, ascending)
    console.log("7. Get Charlie's rank (0-based, low to high):");
    const charlieRank = await client.zrank("leaderboard", "charlie");
    console.log(`Charlie's rank: ${charlieRank}\n`);

    // 8. ZREVRANK - Get reverse rank (0-based, descending)
    console.log("8. Get Charlie's reverse rank (0-based, high to low):");
    const charlieRevRank = await client.zrevrank("leaderboard", "charlie");
    console.log(`Charlie's reverse rank: ${charlieRevRank}\n`);

    // 9. ZCARD - Get total number of members
    console.log("9. Total players in leaderboard:");
    const totalPlayers = await client.zcard("leaderboard");
    console.log(`Total players: ${totalPlayers}\n`);

    // 10. ZCOUNT - Count members in score range
    console.log("10. Players with score between 80-95:");
    const playersInRange = await client.zcount("leaderboard", 80, 95);
    console.log(`Players in range: ${playersInRange}\n`);

    // 11. ZRANGEBYSCORE - Get members by score range
    console.log("11. Players with score >= 90:");
    const highScorers = await client.zrangebyscore(
      "leaderboard",
      90,
      "+inf",
      "WITHSCORES"
    );
    console.log(highScorers);
    console.log();

    // 12. ZINCRBY - Increment member's score
    console.log("12. Increment Bob's score by 10:");
    const newBobScore = await client.zincrby("leaderboard", 10, "bob");
    console.log(`Bob's new score: ${newBobScore}`);

    // Show updated leaderboard
    const updatedBoard = await client.zrevrange(
      "leaderboard",
      0,
      -1,
      "WITHSCORES"
    );
    console.log("Updated leaderboard:", updatedBoard);
    console.log();

    // 13. ZREM - Remove member
    console.log("13. Remove Diana from leaderboard:");
    await client.zrem("leaderboard", "diana");
    console.log("Diana removed");

    const afterRemoval = await client.zrevrange(
      "leaderboard",
      0,
      -1,
      "WITHSCORES"
    );
    console.log("After removal:", afterRemoval);
    console.log();

    // 14. ZREMRANGEBYRANK - Remove by rank
    console.log("14. Remove lowest scoring player:");
    await client.zremrangebyrank("leaderboard", 0, 0);
    console.log("Lowest player removed");

    const afterRankRemoval = await client.zrevrange(
      "leaderboard",
      0,
      -1,
      "WITHSCORES"
    );
    console.log("After rank removal:", afterRankRemoval);
    console.log();

    // 15. ZREMRANGEBYSCORE - Remove by score range
    console.log("15. Remove players with score < 90:");
    const removedCount = await client.zremrangebyscore(
      "leaderboard",
      "-inf",
      89
    );
    console.log(`Removed ${removedCount} players`);

    const finalBoard = await client.zrevrange(
      "leaderboard",
      0,
      -1,
      "WITHSCORES"
    );
    console.log("Final leaderboard:", finalBoard);
    console.log();

    // 16. Multiple sorted sets operations
    console.log("16. Working with multiple sorted sets:");

    // Create another sorted set
    await client.zadd("weekly_scores", [88, "alice", 92, "bob", 85, "frank"]);

    // ZUNIONSTORE - Union of multiple sorted sets
    await client.zunionstore(
      "combined_scores",
      2,
      "leaderboard",
      "weekly_scores"
    );
    const combined = await client.zrevrange(
      "combined_scores",
      0,
      -1,
      "WITHSCORES"
    );
    console.log("Combined scores:", combined);
    console.log();

    // 17. ZPOPMAX and ZPOPMIN - Remove highest/lowest scoring member
    console.log("17. Pop highest scoring player:");
    const poppedMax = await client.zpopmax("combined_scores");
    console.log("Popped max:", poppedMax);

    console.log("Pop lowest scoring player:");
    const poppedMin = await client.zpopmin("combined_scores");
    console.log("Popped min:", poppedMin);
    console.log();

    // Cleanup
    console.log("=== CLEANUP ===");
    await client.del(
      "leaderboard",
      "weekly_scores",
      "combined_scores",
      "names"
    );
    console.log("All sorted sets deleted");
  } catch (error) {
    console.error("Error:", error);
  }
};

// Run the demo
demoSortedSet();