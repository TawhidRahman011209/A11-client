import { Oval } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <Oval
        height={60}
        width={60}
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor="#2563eb"
        strokeWidth={2}
        strokeWidthSecondary={2}
      />
    </div>
  );
};

export default Loader;