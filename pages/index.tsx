import HomePage from '@components/HomePage'
import { competitionUrl } from '@config/baseUrl'
import { ListContext } from 'context/listContext'
import type { GetServerSideProps, NextPage } from 'next'
import dynamic from 'next/dynamic'

const StarBackground = dynamic(() => import('@components/StarBackground'), { ssr: false })

const Home: NextPage<{ list: Competition.List[] }> = ({ list }) => {
  return (
    <div>
      <main>
        <StarBackground />
        <HomePage />
      </main>
    </div>
  )
}

// export const getServerSideProps: GetServerSideProps = async () => {
//   const res = await fetch(`${competitionUrl}/api/brief`, {
//     mode: 'cors'
//   })
//   const data = await res.json()
//   console.log(data)
//   return {
//     props: {
//       list: data.list
//     }
//   }
// }

export default Home
