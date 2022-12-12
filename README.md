# MEAN STACK (NestJs) E-shop

<img src="./img/hero.jpg" alt="Hero Logo" height="350">

# Architecture

The Stack is implemented with **_Docker Swarm Microservcices_**, with traefik at the role of ingress, sending **incoming requests** to the **Frontend (Angular)**, which subsequently make request to the **Backend (NestJS )**, which on its turn makes **queries to MongoDB** to sustain state. The above is described as shown in **Fig. 1.**

|     ![traefik eshop](/img\traefik_eshop.drawio.png)     |
| :-----------------------------------------------------: |
| <b>Fig.1 - Docker Swarm With Traefik Implementation</b> |

# Contents

There are two working environments:

1. The **Client** home page [https:eshop.esite.gr/home](https:eshop.esite.gr/home)
2. The **Admin** home page [https:eshop.esite.gr/admin](https:eshop.esite.gr/admin)

### 1. The Client Environment

The client environment contains the following pages:

a. **Home page** where any messages are displayed in a carousel/slide, pages are listed in grid, and sales are presented in a dragging carousel [https:eshop.esite.gr/home](https:eshop.esite.gr/home),
b. **Search page** for searching products with a filtering side-bar, where user can check out the products, filter in regard the price, color, size, etc. [https://eshop.esite.gr/home/account/whishlist](https://eshop.esite.gr/home/account/whishlist),
c. **Whishlist page** for maintaining user's whishlist [https:eshop.esite.gr/home/search](https:eshop.esite.gr/home/search),
d. **Cart page** to overview the orders and changing the quantity, and color [https://eshop.esite.gr/home/cart](https://eshop.esite.gr/home/cart) and
e. **Payment page** which includes the shipping information and payment information. [https://eshop.esite.gr/home/cart/checkout/shipping](https://eshop.esite.gr/home/cart/checkout/shipping)

Payment has been configured with Paypal (account or credit card)

### 2. The Admin Environment

The admin environment contains the following pages:

a. **Home page** containing the landing page `not completed` [https:eshop.esite.gr/admin/home](https:eshop.esite.gr/admin/home),
b. **Supplier page** with a page tab for the presentation of suppliers, which have been previously recorded [https://eshop.esite.gr/admin/suppliers/show-suppliers](https://eshop.esite.gr/admin/suppliers/show-suppliers), and another page tab for adding new suppliers. [https://eshop.esite.gr/admin/suppliers/add-supplier](https://eshop.esite.gr/admin/suppliers/add-supplier),
c. **Trade numbers page** where the components of the trade number and their matching individual code is presented and may be configured/changed [https://eshop.esite.gr/admin/trade-numbers](https://eshop.esite.gr/admin/trade-numbers),
d. **Cart page** to overview the orders and changing the quantity, and color [https://eshop.esite.gr/home/cart](https://eshop.esite.gr/home/cart) and
e. **Shipping/Payment page** which includes the shipping information and payment information. [https://eshop.esite.gr/home/cart/checkout/shipping](https://eshop.esite.gr/home/cart/checkout/shipping)
