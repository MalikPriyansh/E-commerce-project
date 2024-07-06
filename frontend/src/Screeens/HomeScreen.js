import { useEffect, useReducer } from "react";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Carousel from 'react-bootstrap/Carousel';
import Product from "../Components/Product";
import { Helmet } from "react-helmet-async";
import LoadingBox from "../Components/LoadingBox";
import MessageBox from "../Components/MessageBox";
import img5 from '../Components/images/img5.png';
import img6 from '../Components/images/img6.png';
import img7 from '../Components/images/img7.png';
import img8 from '../Components/images/img8.png';

const reducer = (state , action) => {
  switch(action.type){
    case 'FETCH_REQUEST':
      return {...state, loading:true};
    case 'FETCH_SUCCESS':
      return {...state, products:action.payload,loading:false};
    case 'FETCH_FAIL':
      return {...state, loading : false,error:action.payload};
    default:
      return state;
  }
};

function HomeScreen(){
    const [{loading,error,products},dispatch]=useReducer(reducer,{
      products:[],
      loading : true,
      error:'',
    })
    //const [products,setproducts] = useState([]);
    useEffect(()=>{
      const fetchData = async()=>{
        dispatch({type:'FETCH_REQUEST'});
        try{
          const result = await axios.get('https://e-commerce-project-9zp5.onrender.com/api/products');
          dispatch({type:'FETCH_SUCCESS', payload:result.data});
        }catch(err){
          dispatch({type : 'FETCH_FAIL',payload : err.message});
        } 
        //setproducts(result.data);
      };
      fetchData();
    },[]);
    return <div>
        <Helmet>
          <title>Amazona</title>
        </Helmet>
        <div style={{height : "20%"}}>
          <Carousel>
            <Carousel.Item>
              <img 
                src={img5}
                //height = "5%"
                width = "100%"
                alt="First slide"
              />
            </Carousel.Item>
            <Carousel.Item>
            <img
                //height = "5%"
                width = "100%"
                src={img6}
                alt="Second slide"
              />
            </Carousel.Item>
            <Carousel.Item>
            <img 
                src={img7}
                //height = "5%"
                width = "100%"
                alt="Third slide"
              />
            </Carousel.Item>
            <Carousel.Item>
            <img 
                src={img8}
                //height = "5%"
                width = "100%"
                alt="fourth slide"
              />
            </Carousel.Item>
          </Carousel>
        </div>
        <h1>Featured Products</h1>
        <div className="products">
          {
            loading?(<LoadingBox></LoadingBox>):
            error?(<MessageBox variant="danger">{error}</MessageBox>):
            (
              <Row>
          {products.map(product =>(
            <Col sm={6} md={4} lg={3} className="mb-3">
              <Product product={product}></Product>
          </Col>))}
          </Row>
            )
          }
        </div>
    </div>
}

export default HomeScreen;