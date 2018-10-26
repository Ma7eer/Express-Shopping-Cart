Stripe.setPublishableKey('pk_test_HUWGQ6D3DfHo8dXs9uJF3rnn');

var $form = $('#checkout-form');

$form.submit(function(event) {
  $('#payment-errors').addClass('d-none');
  $form.find('button').prop('disabled', true);
  Stripe.card.createToken({
    number: $('#card-number').val(),
    cvc: $('#cvc-card').val(),
    exp_month: $('#card-expiry-month').val(),
    exp_year: $('#card-expiry-year').val(),
    name: $('#card-holder-name').val()
  }, stripeResponseHandler);
  return false;
});

function stripeResponseHandler(status, response) {

  if (response.error) { // Problem!

    // Show the errors on the form
    $('#payment-errors').text(response.error.message);
    $('#payment-errors').removeClass('d-none');
    $('button').prop('disabled', false); // Re-enable submission

  } else { // Token was created!

    // Get the token ID:
    var token = response.id;

    // Insert the token into the form so it gets submitted to the server:
    $form.append($('<input type="hidden" name="stripeToken" />').val(token));

    // Submit the form:
    $form.get(0).submit();

  }
}