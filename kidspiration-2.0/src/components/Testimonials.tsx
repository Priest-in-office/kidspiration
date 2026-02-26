import TestimonialCard from "./TestimonialCard";

export default function Testimonials() {
  return (
    <div className="flex flex-col gap-8 overflow-hidden bg-background-light px-4 py-16 dark:bg-slate-900">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-text-main dark:text-white">
          Testimonials from all Around The World
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto w-full">
        <TestimonialCard
          name="Sarah (Mom of 2)"
          image="https://lh3.googleusercontent.com/aida-public/AB6AXuB8VzFw-gwfpsYlwDGixo8l09hIqHnD2rAsfy2Rpo0ReuYLpk5ZHyBEkEHgrXmBc_w04F48XJzSoJde5js-RtwD2803iJ4lYlzzbrZyVyhhxxJkl3qGvCNCR9T32gpnlraL2ectOrZ787_15VeURVAclQRVhBya34P5IACiLD8Z4sus5an580f_As2tpOrsMj7vX1QzHGT-iiEuoP3CaDCoVp0W83HEyJwvy22uVWl__vbfEzfE29TKfdG0dAU8Lxojw2xzki8hQVkX"
          date="2 days ago"
          rating={5}
          testimonial="Kidspiration has been a blessing for our family. My kids love the activities and I love knowing they are in a safe environment online."
          likes={12}
        />

        <TestimonialCard
          name="Rev. Mike"
          image="https://lh3.googleusercontent.com/aida-public/AB6AXuCCb6dgQsilP6o2bb3vijlcqdiKLaKysXDzsD2Q5VAFBEaP7xdflixZWiamcN8hfv1OmWpS-PUidSmvbjhz6KP_e2JkFzOYLImhsHh36vAcHcHgZ3vfPARlHp5yUwtHNdXj--qU9wSRgqqLuTBh-cU68YDVHpfiqkGA6b8uEF8ND9A195RYRm7rAum_a9X76ekCyjkqiDqu1Do8NW1g9F_WKUuzIHWvhtE1nyi2gYwwix9DeF20ZxVNzFAsxtLu5sI1oV8S3UixCPBZ"
          date="1 week ago"
          rating={5}
          testimonial="A wonderful resource for connecting with our youth group online. The discussion guides are fantastic for leaders."
          likes={8}
        />

        <TestimonialCard
          name="Timmy (Age 8)"
          image="https://lh3.googleusercontent.com/aida-public/AB6AXuBe9281C2NPfaBnKJ9glLbBXQ77fDmSsIYdaZomj-BU6HfPrFpenLhV8yLiP06GCnlYy7Qm82a1yp6smiWg0wkU1G1u1mBkZ3m21cFxF7aL5Llz6jQrIRyFPaoeBc65gdcl23aHxDcg1hv63gTAdefBOQaBMxw_WIOOv15Cw8PD6AtQu725D3YjLlnJ1od_jagZkf1HSlGI13QOeMyc1YAlt0-uJXM51zMTl4eVoKQpER-qs09haiNupTDmBQFFCQdPh7DRWofDF8N1"
          date="3 days ago"
          rating={5}
          testimonial="I love the activities and the way they are designed to engage kids in learning. The resources are so helpful for parents and teachers."
          likes={15}
        />
      </div>
    </div>
  );
}
