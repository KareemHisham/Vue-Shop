<template>
  <div class="products-table mt-5">
    <!-- Heading -->
    <div class="heading">
      <h3 class="text-capitalize">products list</h3>
      <button
        class="btn btn-info text-capitalize"
        data-toggle="modal"
        data-target="#addProduct"
      >
        <font-awesome-icon :icon="['fas', 'plus']" />
        add product
      </button>
      <!-- Heading -->
      <!-- Modal -->
      <div
        class="modal fade"
        id="addProduct"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Add New Product
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form @submit.prevent="addProduct" id="formProduct">
                <div class="form-group">
                  <input
                    type="text"
                    placeholder="Product Name"
                    class="form-control"
                    autocomplete="off"
                    v-model="productInfo.name"
                  />
                </div>
                <div class="form-group">
                  <input
                    type="number"
                    placeholder="Price"
                    class="form-control"
                    v-model="productInfo.price"
                  />
                </div>
                <div class="form-group">
                  <input
                    type="file"
                    placeholder="Price"
                    class="form-control"
                    accept="image/*"
                    @change="pushImg"
                  />
                </div>
                <div class="form-group">
                  <textarea
                    cols="30"
                    rows="10"
                    placeholder="Description"
                    class="form-control"
                    v-model="productInfo.description"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  class="btn btn-success btn-block"
                  :disabled="
                    !productInfo.name ||
                      !productInfo.price ||
                      !productInfo.description
                  "
                >
                  Add
                </button>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-danger" data-dismiss="modal">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Start Products Table -->
    <table class="table table-striped mt-3" v-if="products.length > 0">
      <thead class="text-center">
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Price</th>
          <th scope="col">Description</th>
          <th scope="col">Image</th>
          <th scope="col">Options</th>
        </tr>
      </thead>
      <tbody class="text-center">
        <!-- Another Way -->
        <!-- <tr v-for="product in products" :key="product.productID">
          <td>{{ product.name }}</td>
          <td>${{ product.price }}</td>
          <td>{{ product.description }}</td>
          <td>
            <img :src="product.imgURL" alt="Product" />
          </td>
          <td class="buttons">
            <button class="btn btn-success edit mr-2">Edit</button>
            <button class="btn btn-danger edit">Delete</button>
          </td>
        </tr> -->
        <tr v-for="product in products" :key="product.id">
          <td>{{ product.data().name }}</td>
          <td>${{ product.data().price }}</td>
          <td>{{ product.data().description }}</td>
          <td>
            <img :src="product.data().imageUrl" alt="Product" />
          </td>
          <td class="buttons">
            <button class="btn btn-success edit mr-3" @click="edit(product.id)">
              Edit
            </button>
            <button
              class="btn btn-danger delete"
              @click="deleteItem(product.id)"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="alert alert-info text-center mt-3" v-else>
      There is no data to show
    </div>
  </div>
</template>
<script>
export default {
  props: [
    "productInfo",
    "addProduct",
    "pushImg",
    "products",
    "edit",
    "deleteItem"
  ]
};
</script>
