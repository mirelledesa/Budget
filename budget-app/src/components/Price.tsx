import { CURRENCY_SYMBOL } from "../constants/money";
import texts from "../data/ca.json";

type PriceSize = "md" | "lg";
const AMOUNT_SIZE_CLASS: Record<PriceSize, string> = {
  md: "text-3xl",
  lg: "text-4xl",
};

interface PriceProps {
  amount: number;
  size?: PriceSize;
}

export const Price = ({ amount, size = "md" }: PriceProps) => (
  <span className="inlineflex, items-baseline">
    <span className={`${AMOUNT_SIZE_CLASS[size]} font-extrabold`}>
      {amount}
    </span>
    <span className="ml-1 text-base font-bold" arial-hidden="true">
      {CURRENCY_SYMBOL}
    </span>
    <span className="sr-only"> {texts.total.currencyName}</span>
  </span>
);
