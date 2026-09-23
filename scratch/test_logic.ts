const history = [
  {
    "id": "ac59e685-459d-4459-a6da-ad1a53b01a71",
    "amount": 0,
    "rate_type": "daily",
    "effective_to": null
  }
];

const hasActive = history.some((c: any) => (!c.effective_to || new Date(c.effective_to) > new Date()) && c.rate_type && !isNaN(Number(c.amount)) && Number(c.amount) > 0);
console.log("hasActive for 0 amount:", hasActive);

const history2 = [
  {
    "id": "ac59e685-459d-4459-a6da-ad1a53b01a71",
    "amount": 500,
    "rate_type": "daily",
    "effective_to": null
  }
];

const hasActive2 = history2.some((c: any) => (!c.effective_to || new Date(c.effective_to) > new Date()) && c.rate_type && !isNaN(Number(c.amount)) && Number(c.amount) > 0);
console.log("hasActive for 500 amount:", hasActive2);
