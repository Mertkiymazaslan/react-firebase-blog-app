import React from "react";
import { Editor } from "react-draft-wysiwyg";
import htmlToDraft from "html-to-draftjs";
import { EditorState, ContentState } from "draft-js";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import DeleteOutlined from "@material-ui/icons/DeleteOutlined";

const PostCard = ({ post, deleteHandler }) => {
  const htmlToDraftBox = (html) => {
    const blocksFromHtml = htmlToDraft(html);
    const { contentBlocks, entityMap } = blocksFromHtml;
    const contentState = ContentState.createFromBlockArray(
      contentBlocks,
      entityMap
    );
    return EditorState.createWithContent(contentState);
  };

  return (
    <div>
      <Card elevation={2}>
        <CardHeader
          action={
            deleteHandler && (
              <IconButton onClick={() => deleteHandler(post.id)}>
                <DeleteOutlined />
              </IconButton>
            )
          }
          title={post.title}
          subheader={`@${post.owner}`}
        />
        <CardContent>
          <Editor
            editorState={htmlToDraftBox(post.text)}
            wrapperClassName="homeWrapper"
            editorClassName="homeEditor"
            toolbarClassName="none"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default PostCard;
