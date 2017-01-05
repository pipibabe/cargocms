function getProductInfo(productDom) {
  number = parseInt(productDom.find('input').val());
  if(!number) number = 0;
  var product = {
    id: productDom.data('id'),
    name: productDom.find('> h1').text(),
    price: productDom.find('.product-price span').text(),
    quantity: number,
  };
  return product;
}

function storeToCart(product) {
  var cart = JSON.parse(localStorage.cart || '[]');
  var replace = false;
  cart = $(cart).map(function (i, e) {
    if (e.id === product.id) {
      replace = true;
      return product;
    } else return e;
  }).toArray();
  if (!replace) {
    cart.push(product);
  }
  cart = $(cart).filter(function (i, e) {
    if(e.number == 0) return false;
    else return true;
  }).toArray();
  localStorage.cart = JSON.stringify(cart);
}

function removeFromCart(productId) {
  var cart = JSON.parse(localStorage.cart || '[]');
  cart = $(cart).filter(function (i, e) {
    if(e.id == productId) return false;
    else return true;
  }).toArray();
  localStorage.cart = JSON.stringify(cart);
}

function updateCartInput() {
  $('.product .form-group input').val(0);
  var cart = JSON.parse(localStorage.cart || '[]');
  $(cart).each(function(index, el) {
    var productDom = $('.product[data-id="' + el.id + '"]');
    $('.form-group input', productDom).val(el.quantity);
  });
}

$(function () {
  updateCartInput();
  $(window).on('modifyCart', function () {
    updateCartInput();
  });

  $('.product input[type="number"]').bootstrapNumber();
  $('.product .input-group input').change(function(event) {
    var product = getProductInfo($(this).closest('.product'));
    storeToCart(product);
    $(window).trigger('modifyCart');
  });
  $('.product .input-group button').click(function(event) {
    var product = getProductInfo($(this).closest('.product'));
    storeToCart(product);
    $(window).trigger('modifyCart');
  });
});

var Cart = new Vue({
  el: '#cart',
  data: {
    carts: JSON.parse(localStorage.cart || '[]'),
  },
  methods: {
    removeProduct: function (index, event) {
      event.stopPropagation();
      removeFromCart(index);
      $(window).trigger('modifyCart');
      this.carts = JSON.parse(localStorage.cart || '[]');
    },
  },
  created: function () {
    $(window).on('modifyCart', function () {
      this.carts = JSON.parse(localStorage.cart || '[]');
    }.bind(this));
  }
});

var OrderForm = new Vue({
  el: '#orderForm',
  data: {
    carts: JSON.parse(localStorage.cart || '[]'),
  },
  computed: {
    priceSum: function () {
      var sum = 0;
      $(this.carts).each(function(index, el) {
        sum += el.price * el.quantity;
      });
      return sum;
    }
  },
  created: function () {
    $(window).on('modifyCart', function () {
      this.carts = JSON.parse(localStorage.cart || '[]');
    }.bind(this));
  },

  filters: {
    moneyNum: function( n ){
      return n.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    }
  }

});
