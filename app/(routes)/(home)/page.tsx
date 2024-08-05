import Image from "next/image";
import styles from "./page.module.css";
import { ModeToggle } from "@/components/ModeToggle";
import Slider from "../_components/Slider";
import CategoryList from "../_components/CategoryList";
import ProductList from "../_components/Product/ProductList";

export default function Home() {
  return (
    <>
    <Slider/>
    <CategoryList/>
    <ProductList/>
    
    </>
    
  );
}
