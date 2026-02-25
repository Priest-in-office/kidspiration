import FeaturesCard from './FeaturesCard';

export default function Features() {
  return (
    <div className="flex flex-col gap-10 px-4 py-16 lg:px-20 lg:py-24 bg-white dark:bg-stone-900 @container">
      <div className="flex flex-col gap-4 text-center items-center">
        <h2 className="text-text-main dark:text-white text-3xl font-black leading-tight sm:text-4xl lg:text-5xl max-w-2xl">
          Discover the Magic
        </h2>
        <p className="text-text-muted dark:text-stone-400 text-lg font-normal leading-normal max-w-2xl">
          Explore a world designed just for you, whether you're a curious kid, a
          supportive parent, or a guiding leader.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto w-full">
        <FeaturesCard
          title="Creative Corner"
          description="Share your artwork and stories with friends in a vibrant gallery."
          imageUrl="https://lh3.googleusercontent.com/aida-public/AB6AXuAYJisnleWNXlDuqEC_E0tP9geElz8mGdKa1zV35H8XzTArG7d2KMZexxC2HrNzLknlXcOyGKxK2w5f01hku10UIiBtyjkhCRrBsGSKy_CLyTAvOtXHOhYF_o1lt2t4QLp8keZRM_JsZtz35H8p7hcdXWBap9hDKfy2hnD9RBKdCW-liak0Bvk8ILRFE8l4hiVZwaXn2dnbx542YFEXL0782g3s51tyiI-lghRdcMIkOpcKfkx3zuviilb1lsWJFLm7elUhrfUqSpo5"
          icon="palette"
        />

        <FeaturesCard
          title="Safe &amp; Secure"
          description="A fully moderated space that parents can trust and kids can enjoy."
          imageUrl="https://lh3.googleusercontent.com/aida-public/AB6AXuDaeMiVs27xRRj2c2pxhGeN0gNVE6S2XrVj0u3YEKsbh4hKC53nA07XiDQQrVzxiwpHiM9NakYTkQZ4PPvmqkN38GWDory4UKiv-L23TSTvi8SxArgy5owbuE9JYfAfOPxTWYr8ry2hZsePrQLtNSEnFCqOy7jpulrwmaLAzbss9VYiyUL9SQ6u_uUh56TsPS-KPEABXrunJ348bvR3dAG6puiTVlDJJKuqDhDZxbc59uxi3Q_iiqhwOknAm-a9T8AaGIFEDrqpIykK"
          icon="lock_person"
        />

        <FeaturesCard
          title="Community Events"
          description="Weekly challenges, virtual camps, and fun meetups for everyone."
          imageUrl="https://lh3.googleusercontent.com/aida-public/AB6AXuA5Wn0o-Y3EPu6o7t9Ij8kTYIXP-jT-y8k3tpmxsAApccR83QmBwEZ13KkQA8raBlgTyJwh9M76Sr5AEayYuNrZhes5LFiu_sRReUklv-3fst5bZHZ0iQkW6E7jDwvOpqu_RFginTM3yUdd1rGw5DwKGhtIBL6XtBrStawF3oz0-Pkc3CbU3c2WPxe9ApcNVYiqwcCMMgjbRqSwC0uGp-8b8FnSR4fLFf7ZKv8MCHhnGP_mGPCAGZoDZXQI3yDFkk3Y1V7s_cV3h8yN"
          icon="groups"
        />
      </div>
    </div>
  );
}
