class StockTicker {
  private observers: (() => void)[] = [];
  private price: number = 0;

  subscribe(observer: () => void) {
    this.observers.push(observer);
  }

  //   unsubscribe(observer: () => void) {
  //     this.observers.filter((e) => {
  //       return e !== observer;
  //     });
  //   }

  setPrice(newPrice: number) {
    if (this.price !== newPrice) {
      this.price = newPrice;
      this.notifyAll();
    }
  }

  private notifyAll(): void {
    for (const observer of this.observers) observer();
  }
}

const ticker = new StockTicker();
ticker.subscribe(() => console.log('Broker 1 notified of price change'));
ticker.subscribe(() => console.log('Broker 2 notified of price change'));
ticker.setPrice(500);
ticker.setPrice(600);
ticker.setPrice(600);
// ticker.unsubscribe(() => console.log('successfully unsubscribed'));
// ticker.setPrice(1500);
