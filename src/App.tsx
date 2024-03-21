import React, { useState } from "react";
import "./App.css";
import { Country } from "./Country";
import { v1 } from "uuid";

export type BanknotsType = "USD" | "RUB" | "ALL";
export type MoneyType = {
  banknote: BanknotsType;
  nominal: number;
  id: string;
};

let defaultMoney: MoneyType[] = [
  { banknote: "USD", nominal: 100, id: v1() },
  { banknote: "USD", nominal: 100, id: v1() },
  { banknote: "RUB", nominal: 100, id: v1() },
  { banknote: "USD", nominal: 100, id: v1() },
  { banknote: "USD", nominal: 100, id: v1() },
  { banknote: "RUB", nominal: 100, id: v1() },
  { banknote: "USD", nominal: 100, id: v1() },
  { banknote: "RUB", nominal: 100, id: v1() },
];

export const moneyFilter = (money: MoneyType[], filter: BanknotsType): any => {
  if (filter === "ALL") {
    return money;
  } else if (filter === "RUB") {
    return money.filter((el) => el.banknote === "RUB");
  } else {
    return money.filter((el) => el.banknote === "USD");
  }
  //если пришел filter со значением 'All', то возвращаем все банкноты
  //return money.filter... ну да, придется фильтровать
};

function App() {
  const [money, setMoney] = useState<MoneyType[]>(defaultMoney);
  const [filterValue, setFilterValue] = useState<BanknotsType>("ALL");

  // а вот сейчас притормаживаем. И вдумчиво: константа filteredMoney получает результат функции moneyFilter
  // в функцию передаем деньги и фильтр, по которому ихбудем выдавать(ретёрнуть)
  const filteredMoney = moneyFilter(money, filterValue);

  const addMoney = (banknote: BanknotsType) => {
    const newBanknote = { banknote: banknote, nominal: 100, id: v1() };
    setMoney([...money, newBanknote]);
    // Добавление денег сделаем в последнюю очередь, после настройки фильтров и отрисовки денег
  };

  const removeMoney = (banknote: BanknotsType) => {
    const index = money.findIndex((el) => el.banknote === banknote);
    if (index !== -1) {
      setMoney(money.filter((el, i) => i !== index));
    }
  };

  return (
    <div className="App">
      <Country
        data={filteredMoney} //отрисовать будем деньги после фильтрации
        setFilterValue={setFilterValue} //useState передаем? Так можно было?!
        addMoney={addMoney}
        removeMoney={removeMoney}
      />
    </div>
  );
}

export default App;
