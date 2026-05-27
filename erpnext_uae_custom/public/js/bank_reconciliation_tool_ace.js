frappe.pages['bank-reconciliation-tool'].on_page_load = function(wrapper) {

    setTimeout(() => {

        function update_bank_summary() {

            let total_deposit = 0;
            let total_withdrawal = 0;

            $('.dt-row').each(function () {

                let deposit_text = $(this)
                    .find('[data-col="deposit"]')
                    .text()
                    .replace(/,/g, '')
                    .trim();

                let withdrawal_text = $(this)
                    .find('[data-col="withdrawal"]')
                    .text()
                    .replace(/,/g, '')
                    .trim();

                let deposit = parseFloat(deposit_text) || 0;
                let withdrawal = parseFloat(withdrawal_text) || 0;

                total_deposit += deposit;
                total_withdrawal += withdrawal;
            });

            // Opening Balance
            let opening_balance = 0;

            let opening_balance_text = $('input[data-fieldname="account_opening_balance"]')
                .val();

            if (opening_balance_text) {
                opening_balance = parseFloat(
                    opening_balance_text.replace(/,/g, '')
                ) || 0;
            }

            // Closing Balance
            let closing_balance_bank =
                opening_balance +
                total_deposit -
                total_withdrawal;

            // Create custom summary
            if ($('#ace-bank-summary').length === 0) {

                $('.reconcile').prepend(`
                    <div id="ace-bank-summary"
                        style="
                            display:flex;
                            gap:50px;
                            margin-bottom:20px;
                            padding:15px;
                            background:#f8f9fa;
                            border-radius:10px;
                            font-size:16px;
                            font-weight:bold;
                        ">

                        <div>
                            Total Deposit<br>
                            <span style="color:green">
                                ${total_deposit.toFixed(2)}
                            </span>
                        </div>

                        <div>
                            Total Withdrawal<br>
                            <span style="color:red">
                                ${total_withdrawal.toFixed(2)}
                            </span>
                        </div>

                        <div>
                            Closing Balance as per Bank Statement<br>
                            <span style="color:blue">
                                ${closing_balance_bank.toFixed(2)}
                            </span>
                        </div>

                    </div>
                `);

            } else {

                $('#ace-bank-summary').html(`

                    <div>
                        Total Deposit<br>
                        <span style="color:green">
                            ${total_deposit.toFixed(2)}
                        </span>
                    </div>

                    <div>
                        Total Withdrawal<br>
                        <span style="color:red">
                            ${total_withdrawal.toFixed(2)}
                        </span>
                    </div>

                    <div>
                        Closing Balance as per Bank Statement<br>
                        <span style="color:blue">
                            ${closing_balance_bank.toFixed(2)}
                        </span>
                    </div>

                `);
            }
        }

        // Refresh every 3 seconds
        setInterval(update_bank_summary, 3000);

    }, 4000);
};