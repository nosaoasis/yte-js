import DOMPurify from "dompurify";
import axios from "axios";

// const dummyPostValue = [
//   {
//     id: 1,
//     post_title: "first title",
//     content:
//       "The Sliding Mr. Bones (Next Stop, Pottersville)The Sliding Mr. Bones (Next Stop, Pottersville)The Sliding Mr. Bones (Next Stop, Pottersville)The Sliding Mr. Bones (Next Stop, Pottersville)The Sliding Mr. Bones (Next Stop, Pottersville)",
//     author: "nomase agho",
//     comments: 1000,
//     published: true,
//   },
//   {
//     id: 2,
//     post_title: "second title",
//     content:
//       "The Sliding Mr. Bones (Next Stop, Pottersville)The Sliding Mr. Bones (Next Stop, Pottersville)The Sliding Mr. Bones (Next Stop, Pottersville)The Sliding Mr. Bones (Next Stop, Pottersville)The Sliding Mr. Bones (Next Stop, Pottersville)",
//     author: "nomase agho",
//     comments: 1000,
//     published: false,
//   },
//   {
//     id: 3,
//     post_title: "third title",
//     content:
//       "The Sliding Mr. Bones (Next Stop, Pottersville)The Sliding Mr. Bones (Next Stop, Pottersville)The Sliding Mr. Bones (Next Stop, Pottersville)The Sliding Mr. Bones (Next Stop, Pottersville)The Sliding Mr. Bones (Next Stop, Pottersville)",
//     author: "nomase agho",
//     comments: 1000,
//     published: true,
//   },
// ];

// const dummySearchResultValue = [
//   {
//     id: 1,
//     post_title: "first search result",
//     content:
//       "The Sliding Mr. Bones (Next Stop, Pottersville)The Sliding Mr. Bones (Next Stop, Pottersville)The Sliding Mr. Bones (Next Stop, Pottersville)The Sliding Mr. Bones (Next Stop, Pottersville)The Sliding Mr. Bones (Next Stop, Pottersville)",
//     author: "nomase agho",
//     comments: 1000,
//     published: true,
//   },
//   {
//     id: 2,
//     post_title: "second search result",
//     content:
//       "The Sliding Mr. Bones (Next Stop, Pottersville)The Sliding Mr. Bones (Next Stop, Pottersville)The Sliding Mr. Bones (Next Stop, Pottersville)The Sliding Mr. Bones (Next Stop, Pottersville)The Sliding Mr. Bones (Next Stop, Pottersville)",
//     author: "nomase agho",
//     comments: 1000,
//     published: false,
//   },
//   {
//     id: 3,
//     post_title: "third third result",
//     content:
//       "The Sliding Mr. Bones (Next Stop, Pottersville)The Sliding Mr. Bones (Next Stop, Pottersville)The Sliding Mr. Bones (Next Stop, Pottersville)The Sliding Mr. Bones (Next Stop, Pottersville)The Sliding Mr. Bones (Next Stop, Pottersville)",
//     author: "nomase agho",
//     comments: 1000,
//     published: true,
//   },
// ];

const createMarkup = (html) => {
  return {
    __html: DOMPurify.sanitize(html),
  };
};

const unpublishPost = async (id, setIsPublished) => {
  const unpublishResponse = prompt(
    "Type 'UNPUBLISH' if you wish to unpublish."
  );
  if (unpublishResponse === "UNPUBLISH") {
    await axios
      .post(`http://localhost:3764/api/v1/post/update_publish`, {
        id,
        published: false,
      })
      .then((res) => {
        const { published } = res.data.post;
        setIsPublished(published);
        alert("Your post has been successfully unpublished");
        return;
      })
      .catch((err) =>
        console.error("an error occured during the posting", err)
      );
  } else {
    alert("Sorry something went wrong. Please try again.");
  }
};

const publishPost = async (id, setIsPublished) => {
  const unpublishResponse = prompt("Type 'PUBLISH' if you wish to publish.");
  if (unpublishResponse === "PUBLISH") {
    await axios
      .post(`http://localhost:3764/api/v1/post/update_publish`, {
        id,
        published: true,
      })
      .then((res) => {
        const { published } = res.data.post;
        setIsPublished(published);
        alert("Your post has been successfully published");
        return;
      })
      .catch((err) =>
        console.error("an error occured during the posting", err)
      );
  } else {
    alert("Sorry something went wrong. Please try again.");
  }
};

export { createMarkup, publishPost, unpublishPost };
