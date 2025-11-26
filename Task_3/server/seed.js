const mongoose = require('mongoose');
const Car = require('./models/Car');

const cars = [ //Seed data 
  {
    name: "Chiron Super Sport",
    model: "Chiron",
    price: "$3,800,000",
    horsepower: 1578,
    topSpeed: 440,
    acceleration: "0-100 km/h in 2.4 seconds",
    description: "The ultimate hyper sports car, representing the pinnacle of automotive engineering. With an 8.0-liter quad-turbocharged W16 engine, the Chiron Super Sport delivers unparalleled performance and driving experience.",
    images: ["/images/chiron.jpg", "/images/chiron1.jpg", "/images/chiron2.jpg", "/images/chiron3.jpg", "/images/chiron4.jpg", "/images/chiron5.jpg", "/images/chiron6.jpg"],
    features: [
      "8.0-liter quad-turbo W16 engine",
      "Carbon fiber monocoque chassis",
      "Advanced aerodynamics",
      "Customizable interior with premium leather",
      "Top speed of 440 km/h",
      "Active suspension system",
      "Brembo carbon-ceramic brakes"
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
    description: "A masterpiece of handling and agility, designed specifically for cornering performance. The Divo focuses on lateral acceleration and precision with enhanced aerodynamics and reduced weight.",
    images: ["/images/divo.jpg", "/images/divo1.jpg", "/images/divo2.jpg", "/images/divo3.jpg", "/images/divo4.jpg", "/images/divo5.jpg"],
    features: [
      "Enhanced aerodynamics for cornering",
      "Reduced weight compared to Chiron",
      "Track-focused suspension setup",
      "Limited to 40 units worldwide",
      "Bespoke interior design",
      "Active aerodynamic flaps",
      "Lightweight forged aluminum wheels"
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
    description: "A one-off masterpiece combining raw performance with exclusive elegance. The Black Car (La Voiture Noire) is a singular expression of Bugatti's design philosophy and engineering excellence.",
    images: ["/images/lvn.jpg", "/images/lvn1.jpg", "/images/lvn2.jpg", "/images/lvn3.jpg"],
    features: [
      "Unique one-off design",
      "Exceptional luxury and craftsmanship",
      "Full carbon fiber body",
      "Handcrafted leather interior",
      "Gold-plated accents",
      "Exclusive personalization options",
      "Limited production masterpiece"
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
    description: "A tribute to the EB110 with modern hypercar technology and design philosophy. The Centodieci celebrates Bugatti's heritage while pushing forward with contemporary engineering.",
    images: ["/images/centodieci.jpg", "/images/centodieci1.jpg", "/images/centodieci2.jpg", "/images/centodieci3.jpg", "/images/centodieci4.jpg", "/images/centodieci5.jpg", "/images/centodieci6.jpg", "/images/centodieci7.jpg"],
    features: [
      "Lightweight construction with carbon fiber",
      "Highest power output in hypercar class",
      "Aerodynamic enhancements inspired by classics",
      "Limited to 10 units worldwide",
      "Heritage-inspired design elements",
      "Advanced driver assistance systems",
      "Bespoke craftsmanship throughout"
    ],
    technicalSpecs: {
      engine: "8.0L W16 Quad-Turbo",
      transmission: "7-speed dual-clutch",
      drivetrain: "AWD",
      fuelEconomy: "City 7 / Highway 14 mpg"
    }
  },
  {
    name: "W16 Mistral",
    model: "W16 Mistral",
    price: "$5,000,000",
    horsepower: 1600,
    topSpeed: 420,
    acceleration: "0-100 km/h in 2.4 seconds",
    description: "The ultimate open-top hypercar experience with a fully exposed W16 engine. The Mistral represents the final expression of Bugatti's legendary W16 power.",
    images: ["/images/w16mistral.jpg", "/images/w16mistral1.jpg", "/images/w16mistral2.jpg", "/images/w16mistral3.jpg", "/images/w16mistral4.jpg"],
    features: [
      "First fully open-top Bugatti hypercar",
      "Exposed W16 engine showcase",
      "Maximum downforce design",
      "Advanced wind deflector system",
      "Limited to 99 units",
      "Premium convertible experience",
      "Racing-inspired aerodynamics"
    ],
    technicalSpecs: {
      engine: "8.0L W16 Quad-Turbo",
      transmission: "7-speed dual-clutch",
      drivetrain: "AWD",
      fuelEconomy: "City 7 / Highway 14 mpg"
    }
  },
  {
    name: "Tourbillon",
    model: "Tourbillon",
    price: "$5,200,000",
    horsepower: 1800,
    topSpeed: 445,
    acceleration: "0-100 km/h in 2.0 seconds",
    description: "The next generation hypercar featuring hybrid technology combined with Bugatti's legendary W16 engine. The Tourbillon marks a new era of automotive excellence.",
    images: ["/images/tourbillion.jpg", "/images/tourbillion1.jpg", "/images/tourbillion2.jpg", "/images/tourbillion3.jpg", "/images/tourbillion4.jpg"],
    features: [
      "Hybrid W16 powertrain technology",
      "Advanced electric motor integration",
      "Regenerative braking system",
      "Ultra-low emissions",
      "State-of-the-art interior technology",
      "Autonomous parking capabilities",
      "Next-generation performance hybrid"
    ],
    technicalSpecs: {
      engine: "8.0L W16 Quad-Turbo + Hybrid",
      transmission: "7-speed dual-clutch with electric motor",
      drivetrain: "AWD with hybrid assist",
      fuelEconomy: "City 10 / Highway 18 mpg"
    }
  },
  {
    name: "Brouillard",
    model: "Brouillard",
    price: "$4,500,000",
    horsepower: 1550,
    topSpeed: 415,
    acceleration: "0-100 km/h in 2.5 seconds",
    description: "Inspired by fog and mystery, the Brouillard combines classic Bugatti design elements with modern performance technology. A sophisticated approach to hypercar engineering.",
    images: ["/images/brouillard.jpg", "/images/brouillard1.jpg", "/images/brouillard2.jpg", "/images/brouillard3.jpg", "/images/brouillard4.jpg"],
    features: [
      "Classic Bugatti design philosophy",
      "Modern aerodynamic efficiency",
      "Premium interior craftsmanship",
      "Signature Bugatti styling",
      "Advanced safety systems",
      "Customizable exterior options",
      "Heritage-inspired performance"
    ],
    technicalSpecs: {
      engine: "8.0L W16 Quad-Turbo",
      transmission: "7-speed dual-clutch",
      drivetrain: "AWD",
      fuelEconomy: "City 8 / Highway 15 mpg"
    }
  },
  {
    name: "Veyron Super Sport",
    model: "Veyron",
    price: "$2,400,000",
    horsepower: 1200,
    topSpeed: 430,
    acceleration: "0-100 km/h in 2.5 seconds",
    description: "The legendary Veyron Super Sport that set world records and defined hypercar performance. A masterpiece of engineering and design that changed automotive history.",
    images: ["/images/veyron.jpg", "/images/veyron1.jpg", "/images/veyron2.jpg", "/images/veyron3.jpg", "/images/veyron4.jpg", "/images/veyron5.jpg"],
    features: [
      "Record-setting performance",
      "Quad-turbocharged W16 engine",
      "Active spoiler system",
      "Distinctive Bugatti styling",
      "Luxurious leather interior",
      "Advanced driving dynamics",
      "Historic performance legacy"
    ],
    technicalSpecs: {
      engine: "8.0L W16 Quad-Turbo",
      transmission: "7-speed dual-clutch",
      drivetrain: "AWD",
      fuelEconomy: "City 8 / Highway 15 mpg"
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
