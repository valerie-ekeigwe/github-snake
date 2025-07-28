const { graphql } = require("@octokit/graphql");
require("dotenv").config();

const username = "valerie-ekeigwe";

(async () => {
  const graphqlWithAuth = graphql.defaults({
    headers: {
      authorization: `token ${process.env.GITHUB_TOKEN}`,
    },
  });

  const query = `
    query {
      user(login: "${username}") {
        contributionsCollection {
          contributionCalendar {
            weeks {
              contributionDays {
                contributionCount
                date
              }
            }
          }
        }
      }
    }
  `;

  try {
    const data = await graphqlWithAuth(query);
    const weeks = data.user.contributionsCollection.contributionCalendar.weeks;

    const flatData = weeks.flatMap(week =>
      week.contributionDays.map(day => ({
        date: day.date,
        count: day.contributionCount
      }))
    );

    const fs = require("fs");
    fs.writeFileSync("contributions.json", JSON.stringify(flatData, null, 2));
    console.log("✅ contributions.json saved!");
  } catch (error) {
    console.error("❌ Error fetching data:", error);
  }
})();
