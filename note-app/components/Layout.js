import Nav from "./Nav";
import HeadInfo from "../components/HeadInfo";

function layout({ children }) {
  return (
    <>
      <HeadInfo />
      <Nav />
      <div>{children}</div>
    </>
  );
}

export default layout;
