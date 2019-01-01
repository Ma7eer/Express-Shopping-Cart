var Product = require('../models/product');

var mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URL);

var products = [
  new Product({
    imagePath: 'https://upload.wikimedia.org/wikipedia/en/5/5e/Gothiccover.png',
    title: 'Gothic',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec cursus viverra ante, ut feugiat leo facilisis at. Praesent tempor, massa ultricies eleifend finibus, purus nunc rutrum urna, in finibus est neque sed nisi. Praesent tortor sapien, pretium ac neque a, volutpat sagittis quam. Sed nec suscipit dolor.',
    price: 12
  }),
  new Product({
    imagePath: 'https://upload.wikimedia.org/wikipedia/en/b/b2/Trine.png',
    title: 'Trine',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec cursus viverra ante, ut feugiat leo facilisis at. Praesent tempor, massa ultricies eleifend finibus, purus nunc rutrum urna, in finibus est neque sed nisi. Praesent tortor sapien, pretium ac neque a, volutpat sagittis quam. Sed nec suscipit dolor.',
    price: 10
  }),
  new Product({
    imagePath: 'https://vignette.wikia.nocookie.net/spongebob/images/4/4b/Revenge.jpg/revision/latest?cb=20101004233839',
    title: 'Revenge of the flying dutchman',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec cursus viverra ante, ut feugiat leo facilisis at. Praesent tempor, massa ultricies eleifend finibus, purus nunc rutrum urna, in finibus est neque sed nisi. Praesent tortor sapien, pretium ac neque a, volutpat sagittis quam. Sed nec suscipit dolor.',
    price: 15
  }),
  new Product({
    imagePath: 'https://upload.wikimedia.org/wikipedia/en/5/51/Monster_Hunter_Coverart.png',
    title: 'Monster Hunter',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec cursus viverra ante, ut feugiat leo facilisis at. Praesent tempor, massa ultricies eleifend finibus, purus nunc rutrum urna, in finibus est neque sed nisi. Praesent tortor sapien, pretium ac neque a, volutpat sagittis quam. Sed nec suscipit dolor.',
    price: 8
  }),
  new Product({
    imagePath: 'https://upload.wikimedia.org/wikipedia/en/4/41/Codbox.jpg',
    title: 'Call of Duty',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec cursus viverra ante, ut feugiat leo facilisis at. Praesent tempor, massa ultricies eleifend finibus, purus nunc rutrum urna, in finibus est neque sed nisi. Praesent tortor sapien, pretium ac neque a, volutpat sagittis quam. Sed nec suscipit dolor.',
    price: 15
  }),
  new Product({
    imagePath: 'https://store-images.s-microsoft.com/image/apps.17382.13510798887677013.afcc99fc-bdcc-4b9c-8261-4b2cd93b8845.49beb011-7271-4f15-a78b-422c511871e4?mode=scale&q=90&h=300&w=200',
    title: 'Minecraft',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec cursus viverra ante, ut feugiat leo facilisis at. Praesent tempor, massa ultricies eleifend finibus, purus nunc rutrum urna, in finibus est neque sed nisi. Praesent tortor sapien, pretium ac neque a, volutpat sagittis quam. Sed nec suscipit dolor.',
    price: 7
  })
];

var done = 0;
for (var i = 0; i < products.length; i++) {
  products[i].save(function(err, result) {
    done++;
    if (done === products.length) {
      exit();
    }
  });
}

function exit() {
  mongoose.disconnect();
}
