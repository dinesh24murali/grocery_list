const productList = [
  {
    category: 'Vegetable',
    name: 'Tomato',
    unit: 'kg',
  },
  {
    category: 'Vegetable',
    name: 'Potato',
    unit: 'kg',
  },
  {
    category: 'Vegetable',
    name: 'Beetroot',
    unit: 'kg',
  },
  {
    category: 'Vegetable',
    name: 'Drumstick',
    unit: 'kg',
  },
  {
    category: 'Vegetable',
    name: 'Chilli',
    unit: 'kg',
  },
  {
    category: 'Vegetable',
    name: 'Red chilli',
    unit: 'kg',
  },
  {
    category: 'Vegetable',
    name: 'Pavakkai',
    unit: 'kg',
  },
  {
    category: 'Vegetable',
    name: 'Kovakkai',
    unit: 'kg',
  },
  {
    category: 'Vegetable',
    name: 'Capsicum',
    unit: 'kg',
  },
  {
    category: 'Vegetable',
    name: 'Spinach',
    unit: 'kg',
  },
  {
    category: 'Vegetable',
    name: 'Corn',
    unit: 'count',
  },
  {
    category: 'Fruit',
    name: 'Banana',
    unit: 'kg',
  },
  {
    category: 'Fruit',
    name: 'Orange',
    unit: 'kg',
  },
  {
    category: 'Fruit',
    name: 'Apple',
    unit: 'kg',
  },
  {
    category: 'Fruit',
    name: 'Peaches',
    unit: 'kg',
  },
  {
    category: 'Vegetable',
    name: 'Carrot',
    unit: 'kg',
  },
  {
    category: 'Vegetable',
    name: 'Big Onion',
    unit: 'kg',
  },
  {
    category: 'Vegetable',
    name: 'Small Onion',
    unit: 'kg',
  },
  {
    category: 'Vegetable',
    name: 'Karuveppilai',
    unit: 'kg',
  },
  {
    category: 'Vegetable',
    name: 'Pudina',
    unit: 'kg',
  },
  {
    category: 'Vegetable',
    name: 'Malli leaf',
    unit: 'kg',
  },
  {
    category: 'Vegetable',
    name: 'Pudalangai',
    unit: 'kg',
  },
  {
    category: 'Vegetable',
    name: 'Vellarikka',
    unit: 'kg',
  },
  {
    category: 'Groceries',
    name: 'Corn Flakes',
    unit: 'kg',
  },
  {
    category: 'Groceries',
    name: 'Wheat flour',
    unit: 'kg',
  },
  {
    category: 'Groceries',
    name: 'Nalla oil',
    unit: 'ltr',
  },
  {
    category: 'Groceries',
    name: 'jam',
    unit: 'ltr',
  },
  {
    category: 'Groceries',
    name: 'Egg',
    unit: 'count',
  },
  {
    category: 'Groceries',
    name: 'Sun flower oil',
    unit: 'ltr',
  },
  {
    category: 'Groceries',
    name: 'Kadalai oil',
    unit: 'ltr',
  },
  {
    category: 'Groceries',
    name: 'Coconut',
    unit: 'count',
  },
  {
    category: 'Groceries',
    name: 'Rice flour',
    unit: 'count',
  },
  {
    category: 'Groceries',
    name: 'Ragi flour',
    unit: 'count',
  },
  {
    category: 'Groceries',
    name: 'Maida',
    unit: 'count',
  },
  {
    category: 'Grain',
    name: 'Thuvaram paruppu',
    unit: 'kg',
  },
  {
    category: 'Grain',
    name: 'Pasi paruppu',
    unit: 'kg',
  },
  {
    category: 'Grain',
    name: 'Idly rice',
    unit: 'kg',
  },
  {
    category: 'Grain',
    name: 'Pacha rice',
    unit: 'kg',
  },
  {
    category: 'Grain',
    name: 'Ponni rice',
    unit: 'kg',
  },
  {
    category: 'Grain',
    name: 'Pasi payaru',
    unit: 'kg',
  },
  {
    category: 'Grain',
    name: 'Ulutham paruppu',
    unit: 'kg',
  },
  {
    category: 'Grain',
    name: 'Ulutham payaru',
    unit: 'kg',
  },
  {
    category: 'Grain',
    name: 'Basmati rice',
    unit: 'kg',
  },
  {
    category: 'Grain',
    name: 'Millet',
    unit: 'kg',
  },
  {
    category: 'Grain',
    name: 'Moong dal',
    unit: 'kg',
  },
  {
    category: 'Grain',
    name: 'Kollu paruppu',
    unit: 'kg',
  },
  {
    category: 'Groceries',
    name: 'Bread',
    unit: 'count',
  },
  {
    category: 'Groceries',
    name: 'Pop corn seeds',
    unit: 'kg',
  },
  {
    category: 'Snacks',
    name: 'Cake',
    unit: 'count',
  },
  {
    category: 'Groceries',
    name: 'Pepper',
    unit: 'kg',
  },
  {
    category: 'Groceries',
    name: 'Coffee powder',
    unit: 'kg',
  },
  {
    category: 'Groceries',
    name: 'Tea powder',
    unit: 'kg',
  },
  {
    category: 'Groceries',
    name: 'Biscuit',
    unit: 'kg',
  },
  {
    category: 'Groceries',
    name: 'Fish',
    unit: 'kg',
  },
  {
    category: 'Groceries',
    name: 'Mutton',
    unit: 'kg',
  },
  {
    category: 'Groceries',
    name: 'Chicken',
    unit: 'kg',
  },
  {
    category: 'Snacks',
    name: 'Chips',
    unit: 'kg',
  },
  {
    category: 'Snacks',
    name: 'Pasta',
    unit: 'kg',
  },
  {
    category: 'Snacks',
    name: 'Ice cream',
    unit: 'kg',
  },
  {
    category: 'Snacks',
    name: 'Maggie',
    unit: 'kg',
  },
  {
    category: 'Snacks',
    name: 'Top ramen',
    unit: 'kg',
  },
  {
    category: 'Groceries',
    name: 'Chilli sause',
    unit: 'ltr',
  },
  {
    category: 'Groceries',
    name: 'Chilli powder',
    unit: 'kg',
  },
  {
    category: 'Groceries',
    name: 'Garam masala',
    unit: 'kg',
  },
  {
    category: 'Groceries',
    name: 'Chaat masala',
    unit: 'kg',
  },
  {
    category: 'Groceries',
    name: 'Rock salt',
    unit: 'kg',
  },
  {
    category: 'Groceries',
    name: 'Jaggery',
    unit: 'kg',
  },
  {
    category: 'Groceries',
    name: 'Kadugu',
    unit: 'kg',
  },
  {
    category: 'Groceries',
    name: 'Dry ginger',
    unit: 'kg',
  },
  {
    category: 'Snacks',
    name: 'Paratha',
    unit: 'kg',
  },
  {
    category: 'Groceries',
    name: 'Butter',
    unit: 'kg',
  },
  {
    category: 'Groceries',
    name: 'Cloves',
    unit: 'kg',
  },
  {
    category: 'Groceries',
    name: 'Turmeric Powder',
    unit: 'kg',
  },
  {
    category: 'Groceries',
    name: 'Sugar',
    unit: 'kg',
  },
  {
    category: 'Groceries',
    name: 'Salt',
    unit: 'kg',
  },
  {
    category: 'Groceries',
    name: 'Kayam powder',
    unit: 'kg',
  },
  {
    category: 'Groceries',
    name: 'Ghee',
    unit: 'ltr',
  },
  {
    category: 'Groceries',
    name: 'Cheese',
    unit: 'count',
  },
  {
    category: 'Groceries',
    name: 'Red Chilli sause',
    unit: 'ltr',
  },
  {
    category: 'Groceries',
    name: 'Tomato sause',
    unit: 'ltr',
  },
  {
    category: 'Groceries',
    name: 'Milk',
    unit: 'ltr',
  },
  {
    category: 'Groceries',
    name: 'Curd',
    unit: 'ltr',
  },
  {
    category: 'Snacks',
    name: 'Coffee',
    unit: 'count',
  },
  {
    category: 'Snacks',
    name: 'Tea',
    unit: 'count',
  },
  {
    category: 'House supplies',
    name: 'Scrubber',
    unit: 'count',
  },
  {
    category: 'House supplies',
    name: 'Balloon',
    unit: 'count',
  },
  {
    category: 'Beauty',
    name: 'Shampoo',
    unit: 'count',
  },
  {
    category: 'Beauty',
    name: 'Conditioner',
    unit: 'count',
  },
  {
    category: 'Beauty',
    name: 'Hamam Soap',
    unit: 'count',
  },
  {
    category: 'House supplies',
    name: 'Scrubber Metal',
    unit: 'count',
  },
  {
    category: 'House supplies',
    name: 'Vim',
    unit: 'count',
  },
  {
    category: 'House supplies',
    name: 'Detergent soap',
    unit: 'count',
  },
  {
    category: 'House supplies',
    name: 'Detergent powder',
    unit: 'count',
  },
  {
    category: 'House supplies',
    name: 'Surf excel',
    unit: 'kg',
  },
  {
    category: 'House supplies',
    name: 'Lizol',
    unit: 'ltr',
  },
  {
    category: 'House supplies',
    name: 'Harpic',
    unit: 'ltr',
  },
  {
    category: 'Beauty',
    name: 'Toothpaste',
    unit: 'ltr',
  },
  {
    category: 'Beauty',
    name: 'Toothbrush',
    unit: 'ltr',
  },
];

export default productList;
// others
// count
// lts
// kg