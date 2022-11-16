import { MdHome, MdShoppingBag } from 'react-icons/md';
import { SiAboutdotme } from 'react-icons/si';
import { IoMdContact } from 'react-icons/io';

export const links = [
  {text: "Home", path: "", icon: <MdHome />}, 
  {text: "Shop", path: "products", icon: <MdShoppingBag />}, 
  {text: "About", path: "about", icon: <SiAboutdotme />}, 
  {text: "Contact", path: "contact", icon: <IoMdContact />}
];