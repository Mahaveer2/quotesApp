<script>
  let url = "https://picsum.photos/1920/1080";
</script>

<div class="center">
  <div class="bg-wrapper">
    <div style="width: 100%;" class="wrapper center col"> 
      <h1 style="color:#fff">About</h1>
      <p style="color:#fff">"Welcome to our website, where we provide quick and easy online quotes for a variety of products and services. Our team of experts is dedicated to helping you find the best deals and discounts to fit your needs. With years of experience in the industry, we have the knowledge and resources to find the perfect solution for you. We pride ourselves on our commitment to customer satisfaction and strive to make the quote process as simple and stress-free as possible. Thank you for choosing us for your online quote needs.</p>
    </div>
  </div>
</div>

<style>
  .bg-wrapper{
    background:url("/about_bg.png") no-repeat ;
    width: 600px;
    background-size: contain;
    position: relative;
    height:800px;
  }

  .center{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

  }

  .center.col{
    flex-direction: column;
  }

  .wrapper{
    width:  100% !important;
    position: absolute;
    top:12%;
    color: #000 !important;
  }

  .wrapper h1,.wrapper p{

    color: #000 !important;
  }
  .wrapper p{
    font-size: 18px;
    width:80%;
  }

  @media screen  and (max-width: 768px) {
    .wrapper {
      top: 9%;
    }
  }
</style>