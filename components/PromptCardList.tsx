import PromptCard from "./PromptCard"
import { PostProps } from "./Feed"


export type PromptCardListProps = {
    data: PostProps[];
    handleTagClick: (args: string) => void;

}

export const PromptCardList = (props: PromptCardListProps) => <div className="mt-16 prompt_layout">
    {
        props.data.map((post) => (
            <PromptCard
                key={post._id}
                post={post}
                handleTagClick={props.handleTagClick}
            />
        ))
    }
</div>