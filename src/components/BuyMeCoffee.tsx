import BuyMeCoffeeIcon from "@public/assets/icons/buy-me-coffee.webp";

const BuyMeACoffeeButton = () => {
  return (
    <a href="https://www.buymeacoffee.com/avfirsov" target="_blank">
      <img
        src={BuyMeCoffeeIcon.src}
        alt="Buy Me A Coffee"
        style={{ height: "30px", width: "108.5px" }}
      />
    </a>
  );
};

export default BuyMeACoffeeButton;
