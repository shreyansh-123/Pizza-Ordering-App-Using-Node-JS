import axios from 'axios';
import noty from 'noty';
import moment from 'moment';

const buttons = document.querySelectorAll('.add-to-cart');
let showqty = document.querySelector('#show-qty');
const orderplaced = document.querySelector('#success-alert');

const Updatecart = (data) => {
    axios.post('/update-cart', data).then(e => {
        showqty.innerText = e.data.totalqty;
        console.log(e);
        new noty({
            type: 'success',
            timeout: 1000,
            text: "Item added to cart",
            progressBar: false
        }).show();
    }).catch((e => {
        console.log(e);
        new noty({
            type: 'error',
            timeout: 1000,
            text: "Something went wrong",
            progressBar: false
        }).show();
    }))
}

buttons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        const data = JSON.parse(btn.dataset.pizza);
        Updatecart(data);
    })
})

if(orderplaced)
{
    setTimeout(() => {
        orderplaced.remove();
    }, 2000);
}

let statuses = document.querySelectorAll('.status_line');
let hiddeninput = document.querySelector('#hiddeninput');
let order = hiddeninput?hiddeninput.value : null;
order = JSON.parse(order);
let time = document.createElement('small');


function Update(order) {
    let stepcompleted = true;
    statuses.forEach((status) => {
        let dataprop = status.dataset.status;
        if(stepcompleted)
        {
            status.classList.add('step-completed');
        }

        if(dataprop === order.status)
        {
            time.innerText = moment(order.updatedAt).format('hh:mm A');
            status.appendChild(time);
            stepcompleted = false;
            if(status.nextElementSibling)
            {
                status.nextElementSibling.classList.add('current');
            }
        }
    })
}

Update(order);

  {
    const orderTableBody = document.querySelector('#orderTableBody')
    let orders = []
    let markup

    axios.get('/admin/orders', {
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then(res => {
         console.log(res.data);
        orders = res.data
        markup = generateMarkup(orders)
        orderTableBody.innerHTML = markup
    }).catch(err => {
        console.log(err);
    })

    function renderItems(items) {
        let parsedItems = Object.values(items)
        return parsedItems.map((menuItem) => {
            return ` <p>${ menuItem.item.name } - ${ menuItem.qty } pcs </p> `
        }).join('')
      }

    function generateMarkup(orders) {
        return orders.map(order => {
            return `
            <tr>
            <td class="border px-4 py-2 text-green-900">
                <p>${ order._id }</p>
                <div>${ renderItems(order.items) }</div>
            </td>
            <td class="border px-4 py-2">${ order.customer_id.name }</td>
            <td class="border px-4 py-2">${ order.address }</td>
            <td class="border px-4 py-2">
                <div class="inline-block relative w-64">
                    <form action="/admin/order/status" method="POST">
                        <input type="hidden" name="orderId" value="${ order._id }">
                        <select name="status" onchange="this.form.submit()"
                            class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                            <option value="order_placed"
                                ${ order.status === 'order_placed' ? 'selected' : '' }>
                                Placed</option>
                            <option value="confirmed" ${ order.status === 'confirmed' ? 'selected' : '' }>
                                Confirmed</option>
                            <option value="prepared" ${ order.status === 'prepared' ? 'selected' : '' }>
                                Prepared</option>
                            <option value="delivered" ${ order.status === 'delivered' ? 'selected' : '' }>
                                Delivered
                            </option>
                            <option value="completed" ${ order.status === 'completed' ? 'selected' : '' }>
                                Completed
                            </option>
                        </select>
                    </form>
                    <div
                        class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20">
                            <path
                                d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                    </div>
                </div>
            </td>
            <td class="border px-4 py-2">
                ${ moment(order.createdAt).format('hh:mm A') }
            </td>
            <td class="border px-4 py-2">
                ${ order.paymentStatus ? 'paid' : 'Not paid' }
            </td>
        </tr>
            `
        }).join('')
    }
}