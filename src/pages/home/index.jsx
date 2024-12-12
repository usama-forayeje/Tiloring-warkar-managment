import Content from "./Content";
import Header from "./Header";
import LeftSidebar from "./LeftSidebar";

function Main() {
  return (
    <div>
      <Header />

      <div >
        <LeftSidebar />
        <Content />
      </div>
    </div>
  );
}

export default Main;
