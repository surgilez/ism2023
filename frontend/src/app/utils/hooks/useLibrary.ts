import { Redux } from '@redux/interfaces/redux'
import { useCallback } from 'react'
import { useSelector } from 'react-redux'

export const useLibrary = () => {
  const { checkoutId } = useSelector((i: Redux) => i.client.payment)

  const Jquery = useCallback(() => {
    const script = document.createElement('script')
    script.src = 'https://code.jquery.com/jquery-3.6.0.min.js'
    script.async = true
    document.head.appendChild(script)

    return () => {
      document.head.removeChild(script)
    }
  }, [])

  const PopperCheckout = useCallback(() => {
    const script = document.createElement('script')
    script.src = `https://test.oppwa.com/v1/paymentWidgets.js?checkoutId=${checkoutId}`
    script.async = true
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [checkoutId])

  const FormPayment = useCallback(() => {
    const script = document.createElement('script')

    /*
    // pagos con diferidos 
    script.innerHTML = `
        var wpwlOptions = {
            onReady: function () {
                var numberOfInstallmentsHtml =
                    '<div class="wpwl-label wpwl-label-custom" style="display: inline-block">Diferidos:</div >' +
                    '<div class="wpwl-wrapper wpwl-wrapper-custom" style="inline-block">' +
                    '<select name="recurring.numberOfInstallments"><option value="0">0</option><option value="3">3</option><option value="6">6</option><option value="9">9</option></select>' +
                    '</div>';
                $('form.wpwl-form-card').find('.wpwl-button').before(numberOfInstallmentsHtml);

                var tipocredito =
                    '<div class="wpwl-wrapper wpwl-wrapper-custom" style="display:inline-block">' +
                    'Tipo de crédito:' +
                    '<select name="customParameters[SHOPPER_TIPOCREDITO]"><option value="00">Corriente</option><option values="01">Dif Corriente</option><option values="02">Dif con int</option><option values="03">Dif sin int</option><option values="07">Dif cont int + Meses gracia</option><option values="09">Dif sin int + Meses gracia</option><option values="21">Dif plus cuotas</option><option values="22">Dif plus</option></select>' +
                    '</div>';

                $('form.wpwl-form-card').find('.wpwl-button').before(tipocredito);

                var datafast =
                    '<br/><br/> <img src="https://www.datafast.com.ec/images/verified.png" style="display: block; margin:0 auto; width:100%;">';
                $('form.wpwl-form-card').find('.wpwl-button').before(datafast);
            },
            style: 'card',
            locale: 'es',
            labels: {
                cvv: 'CVV',
                cardHolder: 'Nombre(Igual que en la tarjeta)',
                insertCode: 'Ingrese el código',
            },
        };
    `
    */

    // pagos con tarjeta (no diferidos)
    script.innerHTML = `
        var wpwlOptions = {
            onReady: function () {
                var numberOfInstallmentsHtml =
                    '<div class="wpwl-wrapper wpwl-wrapper-custom" style="inline-block">' +
                    '</div>';
                $('form.wpwl-form-card').find('.wpwl-button').before(numberOfInstallmentsHtml);


                var datafast =
                    '<br/><br/> <img src="https://www.datafast.com.ec/images/verified.png" style="display: block; margin:0 auto; width:100%;">';
                $('form.wpwl-form-card').find('.wpwl-button').before(datafast);
            },
            style: 'card',
            locale: 'es',
            labels: {
                cvv: 'CVV',
                cardHolder: 'Nombre(Igual que en la tarjeta)',
                insertCode: 'Ingrese el código',
            },
            onBeforeSubmitCard: function(){
              if( $('.wpwl-control-cardHolder').val() == '' ){
                $('.wpwl-control-cardHolder').addClass('wpwl-hash-error');
                $('.wpwl-control-cardHolder').after('<div class="wpwl-hint-cardHolderError" style="color:red;">Nombre del titular de la tarjeta no válido</div>');
                $('.wpwl-button-pay').addClass('wpwl-button-error').attr('disabled', 'disabled');

                return false;
              }else {
                return true;
              }
            }
        };
      `

    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [checkoutId])

  return {
    Jquery,
    PopperCheckout,
    FormPayment,
  }
}
