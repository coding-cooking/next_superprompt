
import Feed from "@components/Feed";

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
        <h1 className="head_text text-center">
            Discover & Share
              <br className="max-md:hidden" />
            <span className="orange_gradient text-center"> AI-Powerd Prompts</span>
        </h1>
        <p className="desc text-center">
        SuperPrompt is an AI-powered tool for today's creative 
        individuals to explore, generate, and exchange creative prompts.
        </p>
        <Feed />
        

    </section>
  )
}

export default Home;
