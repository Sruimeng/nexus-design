```tsx
type ImgSource = string | Blob;

const [src, setSrc] = useState<ImgSource | ImgSource[]>([])

<ImgUploader
  icon={<Icon className="h-6 w-6" icon="i-nexus:info-circle-monotone" />}
  title="正视图"
  description="JPG,PNG,WEBP to 5MB"
  onChange={(file) => {
    setSrc(file);
  }}
/>
```

结合ImgViewer组件来进行图片的回显，如：

```tsx
const [file, setFile] = useState<File | null>(null);

<div className="size-100">
  {file ? (
    <ImgViewer src={file} className="size-80 rounded-4">
      <ImgViewer.Delete onClick={() => setFile(null)} />
    </ImgViewer>
  ) : (
    <ImgUploader
      className="size-80 rounded-4"
      icon="i-nexus:info-circle-monotone"
      title="Drag and drop or click to upload"
      required
      description="JPG,PNG,WEBP to 5MB"
      onChange={(file) => setFile(file)}
    />
  )}
</div>
```
