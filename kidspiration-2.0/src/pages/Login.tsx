import AuthLayout from "../components/AuthLayout";
import LoginForm from "../components/LoginForm";

export default function Login() {
  return (
    <AuthLayout
      badge="Welcome Back"
      heading={<>Good to see you <span className="text-primary">again</span></>}
      subtitle="Log in to continue your journey with Kidspiration."
      socialProof="Trusted by 1,000+ families"
    >
      <LoginForm />
    </AuthLayout>
  );
}
