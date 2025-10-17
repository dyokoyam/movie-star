export type VideoMeta = {
  id: string;
  title: string;
  duration: number;
  isPaid: boolean;
};

export const createVideoMeta = (title: string): VideoMeta => ({
  id: `video_${Math.random().toString(36).slice(2)}`,
  title,
  duration: 0,
  isPaid: false,
});
