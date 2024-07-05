import Layout from "@/components/layout"
import {TOKEN,DATABASE_ID} from "../config"
export default function Projects({projects,porjecNames}){

  return(
    <>
      <Layout>
        <h1>총 프로젝트 : {porjecNames.length} 개</h1>
        {

            projects.results.map((aProject,i)=>{
                return(
                  <>
                    {aProject.properties.이름.title[0].plain_text}
                  </>
                )
            })
          /* 
           projects.results.map((aProject)=>(
            <>
              {aProject.properties.이름.title[0].plain_text}
            </>
          ))
          */
        }
      </Layout>
    </>
  )
}


export async function getStaticProps() {

  const options = {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'Notion-Version': '2022-06-28',
      'content-type': 'application/json',
      'authorization': `Bearer ${TOKEN}`,
    },
    body: JSON.stringify({
      sorts :[
        {
          "property":"이름",
          "direction":"ascending"
        }

      ],
      page_size: 100
    })
  };
  
  const res = await fetch(`https://api.notion.com/v1/databases/${DATABASE_ID}/query`, options)
  const projects = await res.json()
  //console.log(projects)
 
  const porjecNames = projects.results.map((aProject)=>(
    aProject.properties.이름.title[0].plain_text
  ))
  //console.log(`porjecNames:${porjecNames}`)
  //console.log(projects.results[0].properties.이름.title[0]?.plain_text)
  return {
    props: {projects,porjecNames}, // will be passed to the page component as props
  }
}