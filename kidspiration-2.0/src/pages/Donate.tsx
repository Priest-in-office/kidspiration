import AuthLayout from "../components/AuthLayout";
import DonationForm from "../components/DonationForm";

export default function Donate() {
  return (
    <AuthLayout
      badge="Partner With Us"
      heading={
        <>
          Make a{" "}
          <span className="text-primary relative inline-block">
            Difference
            <svg
              className="absolute w-full h-3 -bottom-1 left-0 text-primary opacity-40"
              preserveAspectRatio="none"
              viewBox="0 0 100 10"
            >
              <path
                d="M0 5 Q 50 10 100 5"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
              />
            </svg>
          </span>
        </>
      }
      subtitle="Your generosity reaches children across the globe with faith, hope, and the transforming power of God's Word."
      socialProof="Join 500+ partners making an impact"
    >
      <DonationForm />
    </AuthLayout>
  );
}
