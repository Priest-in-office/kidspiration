import AuthLayout from "../components/AuthLayout";
import SignupForm from "../components/SignupForm";

export default function Signup() {
  return (
    <AuthLayout
      badge="For Adults"
      heading={
        <>
          Inspire the next{" "}
          <span className="text-primary relative inline-block">
            generation
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
      subtitle="Join our community of parents, mentors, and spiritual leaders dedicated to guiding children on their journey."
    >
      <SignupForm />
    </AuthLayout>
  );
}
