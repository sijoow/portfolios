import Image from "next/image";

export default function ProjectItem({ data }) {
  const title = data.properties.이름.title[0].plain_text;
  const githubLink = data.properties.Github.url;
  const description = data.properties.Description.rich_text[0].plain_text;
  const imageSrc = data.cover?.file?.url || data.cover?.external?.url;
  const tags = data.properties.관련기술.multi_select;
  const SiteLink = data.properties.URL.url;

  if (imageSrc) {
    console.log(imageSrc);
  } else {
    console.error('Image URL not found');
  }
  console.log(tags);

  return (
    <>
      <div className="border mt-4 rounded-md overflow-hidden">
        {imageSrc ? (
          <Image
            className="overflow-hidden cursor-pointer border"
            src={imageSrc}
            alt="cover image"
            width={700}
            height={400}
            layout="responsive"
            objectFit="cover"
            quality={100}
          />
        ) : (
          <div className="overflow-hidden cursor-pointer border" style={{width: '100%', height: '60%', backgroundColor: '#ccc'}}>
            <p style={{textAlign: 'center', paddingTop: '30%'}}>No image available</p>
          </div>
        )}

        <div className="p-4 flex flex-col cards">
          <h1 className="text-2xl font-bold">{title}</h1>
          <h3 className="mt-4 text-sm leading-6">{description}</h3>
          <a href={SiteLink} className="mt-4 text-sm">라이브 사이트 바로가기</a>
          <a href={githubLink} className="mt-4 text-sm">깃 바로가기</a>
          <div className="flex items-start mt-4">
            {tags.map((aTag) => (
              <h1 className="px-2 py-1 mr-2 rounded-md bg-sky-200 dark:bg-yellow-700 w-30" key={aTag.id}>{aTag.name}</h1>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
