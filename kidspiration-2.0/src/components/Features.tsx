import FeaturesCard from "./FeaturesCard";
import kidspiration2 from "../assets/kidspiration-2.png";
import kidspiration3 from "../assets/kidspiration-3.png";
import kidspiration4 from "../assets/kidspiration-4.png";
import kidspiration5 from "../assets/kidspiration-5.png";
import kidspiration6 from "../assets/kidspiration-6.png";
import kidspiration7 from "../assets/kidspiration-7.png";

export default function Features() {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const getCurrentMonth = () => {
    const date = new Date();
    const month = date.getMonth();
    return months[month];
  };

  return (
    <div className="flex flex-col gap-10 px-4 py-16 lg:px-20 lg:py-24 bg-white dark:bg-slate-800 @container">
      <div className="flex flex-col gap-4 text-center items-center">
        <h2 className="text-text-main dark:text-white text-3xl font-black leading-tight sm:text-4xl lg:text-5xl max-w-2xl">
          Get Involved Today
        </h2>
        <p className="text-text-muted dark:text-stone-400 text-lg font-normal leading-normal max-w-2xl">
          Join our mission to reach every child with the message of hope. Explore our interactive resources, participate in global challenges, and discover how you can make a difference today.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto w-full">
        <FeaturesCard
          title="The Last Child Challenge"
          description="Enlist to join the Last Child challenge. We are on the race to reach the last child with the Healing to the Nations Magazine for Kids."
          imageUrl={kidspiration2}
          icon="emoji_events"
          link="/signup"
        />

        <FeaturesCard
          title="Read Healing To The Nations Magazine"
          description="Interactive Digital Magazine for Kids. Stories, games, and miracles made just for you!"
          imageUrl={kidspiration3}
          icon="auto_stories"
          link="https://httnmagazine.org/magazine/order?type=kids"
        />

        <FeaturesCard
          title="Order HTTN Magazine for Kids"
          description={`Get the ${getCurrentMonth()} Edition of the HTTN FOR KIDS. Order the new Healing to the Nations Magazine for Kids.`}
          imageUrl={kidspiration4}
          icon="shopping_bag"
          link="https://httnmagazine.org/magazine/order?type=kids"
        />

        <FeaturesCard
          title="Kidspiration Marketplace"
          description="Shop with Purpose. Get official merchandise and support children worldwide!"
          imageUrl={kidspiration5}
          icon="storefront"
          link="/shop"
        />

        <FeaturesCard
          title="Kidspiration Party Initiative"
          description="Celebrate Every Child. Bring joy to children who may have never had a birthday party."
          imageUrl={kidspiration6}
          icon="celebration"
        />

        <FeaturesCard
          title="ER100 Initiative"
          description="This is a campaign to reach 3 Billion Children with the message of faith,healing and hope through the C.O.M.P.L.E.T.E Mandate while distributing the instrument of faith - the Healing to the Nations Magazine for kids."
          imageUrl={kidspiration7}
          icon="public"
          link="/er100"
        />
      </div>
    </div>
  );
}
