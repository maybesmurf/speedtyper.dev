/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import useUserResults from "../../hooks/useUserResults";
import { humanizeTimePlayed } from "../../utils/humanize";
import SecondChart from "../../components/SecondChart";
import { useRouter } from "next/router";

interface ProfileProps {
  userName?: string;
}

const ProfileItem = ({
  children,
}: {
  children: React.ReactChild;
  customWidth?: string;
}) => {
  return (
    <div className="flex items-center justify-between bg-dark-lake text-off-white p-5 gap-10 mr-6 mb-4 rounded-xl shadow-lg w-full">
      {children}
    </div>
  );
};

export type ResultSelectorType = "monthly" | "annual";

const ProfilePage = (props: ProfileProps) => {
  const router = useRouter();
  const { username } = router.query;

  // TODO: handle Nextjs query being of type string | string[] | undefined
  const userResults = useUserResults(username);

  const [resultSelector, setResulSelector] = useState(
    "monthly" as ResultSelectorType
  );

  if (!userResults) {
    return null;
  }

  const challengeResults = userResults[resultSelector];

  return userResults ? (
    <div className="flex text-off-white items-center justify-center h-full tracking-wider">
      <div className="flex items-center flex-col">
        <div className="flex flex-wrap items-center">
          <ProfileItem>
            <>
              <div className="flex gap-5 items-center">
                <div>
                  <img
                    src={`https://github.com/${username}.png`}
                    alt={username as string}
                    className="rounded-full w-24"
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <h3 className="text-2xl font-bold">{username}</h3>
                  <h4>
                    Joined{" "}
                    {new Date(userResults.createdAt).toDateString().slice(4)}
                  </h4>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <h3 className="text-xl">Games Played</h3>
                <h4 className="text-4xl">{userResults.gamesPlayed}</h4>
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="text-xl">Time Played</h3>
                <h4 className="text-4xl">
                  {" "}
                  {humanizeTimePlayed(userResults.totalSecondsPlayed)}
                </h4>
              </div>
            </>
          </ProfileItem>
        </div>
        <div className="max-w-5xl w-full bg-dark-lake items-center mt-4 pt-2 text-lg text-off-white font-light rounded-md text-white">
          <div className="flex flex-row">
            <h1 className="text-xl px-8 py-4 font-bold">Progress (WPM)</h1>
            <div className="text-sm"></div>
            <button
              className={`font-bold my-4 outline-none border-none ${
                resultSelector === "monthly"
                  ? "text-purple-200"
                  : "text-off-white"
              }`}
              style={{
                outline: "none",
              }}
              onClick={() => setResulSelector("monthly")}
            >
              30 days
            </button>
            <button
              className={`font-bold m-4 mr-8 ${
                resultSelector === "annual"
                  ? "text-purple-200"
                  : "text-off-white"
              }`}
              style={{
                outline: "none",
              }}
              onClick={() => setResulSelector("annual")}
            >
              12 months
            </button>
          </div>
          <SecondChart
            challengeResults={challengeResults}
            resultSelector={resultSelector}
          />
        </div>
      </div>
    </div>
  ) : null;
};

export default ProfilePage;
