import { Brand } from "./all-brands";
import { availableBrandDisplayValues } from "./brand-display-values";
import { availableBrandIcons } from "./brand-icons";

type BrandInfo = {
  displayValue: string;
  icon: JSX.Element;
};

type Brands = { [key in Brand]: BrandInfo };

export const availableBrands = Object.values(Brand).reduce((result, brand) => {
  result[brand] = {
    displayValue: availableBrandDisplayValues[brand],
    icon: availableBrandIcons[brand],
  };
  return result;
}, {} as Brands);
