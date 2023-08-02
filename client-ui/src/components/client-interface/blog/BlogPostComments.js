import React, {useEffect} from "react"
import axios from "axios"

const BlogPostComments = (props) => {
  const {blog_id} = props


  useEffect(() => {
    axios.get(`http://localhost:3764/api/v1/comments/post_comments/${blog_id}`)
    .then(res => console.log("the data for the comment is", res))
    .catch(err => console.log("An error has occured", err))
  })

  return (
    <>
      <p className="mt-10">
            <span className="font-bold">Yte Angel</span> - fetch the comments for the post ;lkfn d;fm ;odfv d;fvom v;sdo
            oisdvkfdv piofv e;or e;foi ifhf ;ewoifhfeijfom iojewf ;oeifj
            ef;wfoihweofnfetch the comments for the post ;lkfn d;fm ;odfv d;fvom
            v;sdo oisdvkfdv piofv e;or e;foi ifhf ;ewoifhfeijfom iojewf ;oeifj
            ef;wfoihweofnfetch the comments for the post ;lkfn d;fm ;odfv d;fvom
            v;sdo oisdvkfdv piofv e;or e;foi ifhf ;ewoifhfeijfom iojewf ;oeifj
            ef;wfoihweofnfetch the comments for the post ;lkfn d;fm ;odfv d;fvom
            v;sdo oisdvkfdv piofv e;or e;foi ifhf ;ewoifhfeijfom iojewf ;oeifj
            ef;wfoihweofnfetch the comments for the post ;lkfn d;fm ;odfv d;fvom
            v;sdo oisdvkfdv piofv e;or e;foi ifhf ;ewoifhfeijfom iojewf ;oeifj
            ef;wfoihweofnfetch the comments for the post ;lkfn d;fm ;odfv d;fvom
            v;sdo oisdvkfdv piofv e;or e;foi ifhf ;ewoifhfeijfom iojewf ;oeifj
            ef;fetch the comments for the post ;lkfn d;fm ;odfv d;fvom v;sdo
            oisdvkfdv piofv e;or e;foi ifhf ;ewoifhfeijfom iojewf ;oeifj
            ef;wfoihweofnfetch the comments for the post ;lkfn d;fm ;odfv d;fvom
            v;sdo oisdvkfdv piofv e;or e;foi ifhf ;ewoifhfeijfom iojewf ;oeifj
            ef;wfoihweofnfetch the comments for the post ;lkfn d;fm ;odfv d;fvom
            v;sdo oisdvkfdv piofv e;or e;foi ifhf ;ewoifhfeijfom iojewf ;oeifj
            ef;wfoihweofnfetch the comments for the post ;lkfn d;fm ;odfv d;fvom
            v;sdo oisdvkfdv piofv e;or e;foi ifhf ;ewoifhfeijfom iojewf ;oeifj
            ef;wfoihweofnfetch the comments for the post ;lkfn d;fm ;odfv d;fvom
            v;sdo oisdvkfdv piofv e;or e;foi ifhf ;ewoifhfeijfom iojewf ;oeifj
            ef;wfoihweofnfetch the comments for the post ;lkfn d;fm ;odfv d;fvom
            v;sdo oisdvkfdv piofv e;or e;foi ifhf ;ewoifhfeijfom iojewf ;oeifj
            ef;wfoihweofnfetch the comments for the post ;lkfn d;fm ;odfv d;fvom
            v;sdo oisdvkfdv piofv e;or e;foi ifhf ;ewoifhfeijfom iojewf ;oeifj
            ef;wfoihweofnfetch the comments for the post ;lkfn d;fm ;odfv d;fvom
            v;sdo oisdvkfdv piofv e;or e;foi ifhf ;ewoifhfeijfom iojewf ;oeifj
            ef;wfoihweofnfetch the comments for the post ;lkfn d;fm ;odfv d;fvom
            v;sdo oisdvkfdv piofv e;or e;foi ifhf ;ewoifhfeijfom iojewf ;oeifj
            ef;wfoihweofnfetch the comments for the post ;lkfn d;fm ;odfv d;fvom
            v;sdo oisdvkfdv piofv e;or e;foi ifhf ;ewoifhfeijfom iojewf ;oeifj
            ef;wfoihweofn
          </p>
    </>
  )
}

export default BlogPostComments