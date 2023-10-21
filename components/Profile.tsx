import PromptCard from "./PromptCard"
import { PostProps } from "./Feed"

export type ProfileProps = {
  name: string;
  desc: string;
  handleEdit?: (args:PostProps) => void;
  handleDelete?: (args: PostProps) => void;
  data: PostProps[];
}

const Profile = ({ name, desc, data, handleEdit, handleDelete }: ProfileProps) => {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{ name } Profile</span>
      </h1>
      <p className="desc text-left">{desc}</p>
      <div className="mt-10 prompt_layout">
        {
          data.map((post) => (
            <PromptCard
              key={ post._id }
              post={ post }
              handleEdit={(e) => handleEdit && handleEdit(post)}
              handleDelete={(e) => handleDelete && handleDelete(post)}
            />
          ))
        }
      </div>
    </section>
  )
}

export default Profile
