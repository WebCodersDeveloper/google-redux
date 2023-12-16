import { useEffect, useState } from "react";
import { CgMenuGridO } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { addgadgets, removeGadgets } from "./component/gadgetsSlicer";
import { CiMenuKebab, CiSearch } from "react-icons/ci";
import { FaPen } from "react-icons/fa6";

export default function App() {
  const selector = useSelector((state) => state.gadgets);
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [showBtn, setShowBtn] = useState(false);
  const [menu, setMenu] = useState(true);
  const [remove, setRemove] = useState(false);

  // const shouldShowAddButton = selector.length < 10;
  // function hover() {
  //   if (item) {
  //     item.addEventListener('mouseenter', () => setMenu(true));
  //     item.addEventListener('mouseleave', () => setMenu(false));
  //   }

  // }

  const [openedMenu, setOpenedMenu] = useState(null);

  const handleMenu = (id) => {
    setOpenedMenu(id);
    if (!remove) {
      setRemove(true);
    }
    else{
      setRemove(false);
    }
  };

  useEffect(() => {
    if (selector.length <= 9) {
      setShowBtn(true);
      console.log(true);
    } else {
      setShowBtn(false);
    }
  }, [selector.length]);

  function handleAddClick() {
    setShowForm(true);
  }

  function getProtocolAndDomain(url) {
    if (url.includes("://")) {
      return url;
    }
    return `http://${url}`;
  }

  const cancel = () => {
    setShowForm(false);
  };
  const handleRemove = (id) => {
    dispatch(removeGadgets(id));
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (title.trim() !== "" && url.trim() !== "") {
      console.log(title, url);
      setTitle(""),
        setUrl(""),
        dispatch(
          addgadgets({
            title,
            url,
            favicon: `${new URL(getProtocolAndDomain(url)).origin}/favicon.ico`,
            defaultImage: url[0].toUpperCase(),
          })
        );

      setShowForm(false);
    }
  };
  return (
    <>
      <div className="main">
        <div className="top">
          <a href="https://mail.google.com/">Gmail</a>
          <a href="https://www.google.com/imghp?hl=ru&tab=ri&ogbl">Image</a>
          <span>
            <CgMenuGridO />
          </span>
          <img
            src="https://cdn-icons-png.flaticon.com/512/219/219983.png"
            alt=""
          />
        </div>
        <div className="bottom">
          <img
            src="https://white.logodownload.org/wp-content/uploads/2020/11/google-white-logo.png"
            alt=""
          />
          <span className="search__icon">
            <CiSearch />
          </span>
          <div className="search__icons">
            <img
              src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-25-512.png"
              alt=""
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/d/d6/Google_Lens_Icon.svg"
              alt=""
            />
          </div>
          <input
            className="main__search"
            type="text"
            placeholder="Search Google or type a URL"
            name=""
            id=""
          />
          <div className="gadgets">
            {selector.map((gadget) => (
              <div className="gadgets__item" id="item" key={gadget.id}>
                <a href={gadget.url}>
                  <img
                    src={
                      gadget.favicon ||
                      `https://via.placeholder.com/50?text=${gadget.defaultImage}`
                    }
                    alt="404"
                  />
                  <p>{gadget.title}</p>
                </a>
                <div>
                  <button className="menu__item" onClick={() => handleMenu(gadget.id)}><CiMenuKebab /></button>

                  {openedMenu === gadget.id && remove && (
                    <div className="item_menu">
                      <button onClick={() => handleRemove(gadget.id)}>
                        Remove
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {showBtn && (
              <div className="gadgets__item">
                <button className="plus" onClick={handleAddClick}>
                  +
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="ft">
           <span><FaPen /></span>
        </div>
        {showForm && (
          <div className="tooltip__form">
            <form>
              <h2>Add Gadget</h2>
              <label>Name</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <label>URL</label>
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </form>
            <div className="form__btn">
              <button onClick={cancel}>Cancel</button>
              <button onClick={handleSave}>Done</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
