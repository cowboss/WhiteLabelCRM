export const calculateQuoteTotal = ({ items, markupEnabled, markupPercent, discountEnabled, discountPercent, taxEnabled, taxPercent }) => {
  const subtotal = items.reduce((sum, item) => sum + Number(item.quantity || 0) * Number(item.unitPrice || 0), 0);
  const markup = markupEnabled ? subtotal * (Number(markupPercent || 0) / 100) : 0;
  const discountBase = subtotal + markup;
  const discount = discountEnabled ? discountBase * (Number(discountPercent || 0) / 100) : 0;
  const taxBase = discountBase - discount;
  const tax = taxEnabled ? taxBase * (Number(taxPercent || 0) / 100) : 0;

  return Number((taxBase + tax).toFixed(2));
};
