import Info from "./components/Info.jsx";
import RegisterForm from "./components/forms/RegisterForm.jsx";

const Register = () => {
  <div>
    <main className="flex flex-col-reverse items-center justify-center w-full md:flex-row">
      <div className="flex w-1/2 px-10 py-8 md:px-10 min-h-screen bg-violet-950 items-center justify-center">
        <RegisterForm />
      </div>
      <Info />
    </main>
  </div>;
};
export default Register;
