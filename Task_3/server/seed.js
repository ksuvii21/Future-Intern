const mongoose = require('mongoose');
const Car = require('./models/Car');

const cars = [ //Seed data for Bugatti cars
  {
    name: "Chiron Super Sport",
    model: "Chiron",
    price: "$3,800,000",
    horsepower: 1578,
    topSpeed: 440,
    acceleration: "0-100 km/h in 2.4 seconds",
    description: "The ultimate hyper sports car, representing the pinnacle of automotive engineering.",
    images: ["/images/chiron-1.jpg", "/images/chiron-2.jpg"],
    features: [
      "8.0-liter quad-turbo W16 engine",
      "Carbon fiber monocoque",
      "Advanced aerodynamics",
      "Customizable interior"
    ],
    technicalSpecs: {
      engine: "8.0L W16 Quad-Turbo",
      transmission: "7-speed dual-clutch",
      drivetrain: "AWD",
      fuelEconomy: "City 8 / Highway 15 mpg"
    }
  },
  {
    name: "Divo",
    model: "Divo",
    price: "$5,800,000",
    horsepower: 1479,
    topSpeed: 380,
    acceleration: "0-100 km/h in 2.4 seconds",
    description: "A masterpiece of handling and agility, designed for cornering performance.",
    images: ["/images/divo-1.jpg", "/images/divo-2.jpg"],
    features: [
      "Enhanced aerodynamics",
      "Reduced weight",
      "Track-focused setup",
      "Limited production"
    ],
    technicalSpecs: {
      engine: "8.0L W16 Quad-Turbo",
      transmission: "7-speed dual-clutch",
      drivetrain: "AWD",
      fuelEconomy: "City 7 / Highway 14 mpg"
    }
  },
  {
    name: "La Voiture Noire",
    model: "La Voiture Noire",
    price: "$18,700,000",
    horsepower: 1500,
    topSpeed: 420,
    acceleration: "0-100 km/h in 2.5 seconds",
    description: "A one-off masterpiece combining performance with exclusive elegance.",
    images: ["/images/lvn-1.jpg", "/images/lvn-2.jpg"],
    features: [
      "Unique design",
      "Exceptional luxury",
      "Carbon fiber body",
      "Handcrafted interior"
    ],
    technicalSpecs: {
      engine: "8.0L W16 Quad-Turbo",
      transmission: "7-speed dual-clutch",
      drivetrain: "AWD",
      fuelEconomy: "City 7 / Highway 14 mpg"
    }
  },
  {
    name: "Centodieci",
    model: "Centodieci",
    price: "$9,000,000",
    horsepower: 1600,
    topSpeed: 380,
    acceleration: "0-100 km/h in 2.4 seconds",
    description: "A tribute to the EB110 with modern hypercar technology and design.",
    images: ["/images/centodieci-1.jpg", "/images/centodieci-2.jpg"],
    features: [
      "Lightweight construction",
      "High power output",
      "Aerodynamic enhancements",
      "Limited to 10 units"
    ],
    technicalSpecs: {
      engine: "8.0L W16 Quad-Turbo",
      transmission: "7-speed dual-clutch",
      drivetrain: "AWD",
      fuelEconomy: "City 7 / Highway 14 mpg"
    }
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/bugatti-clone');
    await Car.deleteMany({});
    await Car.insertMany(cars);
    console.log('Database seeded successfully');
    process.exit();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
