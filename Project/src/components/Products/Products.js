import { useEffect, useState } from "react"  
import ListItem from "./ListItems/ListItem"
import axios from "axios"  //for network calls we use axios module
import Loader from "../UI/Loader"
import { useHistory, useLocation, useParams } from "react-router-dom"

const Products = () => {
    // default value of items is an empty array
    const [items, setItems] = useState([])
    //initially true
    const [loader, setLoader] = useState(true)
    //params is used to store the parameters of the current route

    const params = useParams()
    const history = useHistory()
    const { search } = useLocation()
    const queryParams = new URLSearchParams(search).get("search")

    useEffect(() => {
        /* cant directly make the arrow fucntion asynchronous because it may result in asynchronous call but the above funciton is also used synchonously somewhere so bugs may be created . so instead make a new async() function  */
        async function fetchItems() {
            try {
                
                // we will use this items.json to append after query to read data in a json fromat
                let slug = `items.json`
                // category is numeric either 1 2 3 or 4
                if(params.category) {
                    slug = `items-${params.category}.json`
                }
                // if queryparamsexists(i.e) of the parameters exits
                if(queryParams) {
                    slug += `?search=${queryParams}`
                }
                // items-category-1.json
                const response = await axios.get(`https://react-et-default-rtdb.firebaseio.com/${slug}`);
                const data = response.data
                // we store the data from the web in this data

                // if not recevied
                if(!data) {
                    handleNotFound();
                    return;
                }

                
                // now we create a diff file named transformedData and store all the data in it . by this we get all the attributes along with the id attribute .
                  
                const transformedData = data.map((item, index) => {
                    return {
                        ...item,
                        id: index
                    }
                })

                console.log(transformedData);
                // setLoader(false)

                //after we get the transformed data we then call setitems wiht that data
                setItems(transformedData)  ; 
            } 
            catch (error) {
                // setLoader(false)
                console.log("Error: ", error)
                alert("Some error occurred");
            }
            finally {
                //remains false wheteher task is succeded or mnot in both the cases

                setLoader(false)
            }
        }

        //calling the fetchItems function.
        fetchItems();

        return () => {
            setItems([])
            setLoader(true)
        }
    }, [params.category, queryParams])

    const handleNotFound = () => {
        history.push("/404")
    }

    return (
        <>
        <div className={"product-list"}>
            <div className={"product-list--wrapper"}>
                {
                    items.map(item => {
                        return (<ListItem key={item.id} data={item}/>)
                    })
                }
            </div>
        </div>
        //when rendering takes time the loader appears and as soon as list appears it disapears
        { loader && <Loader/>}
        </>
    )
}

export default Products