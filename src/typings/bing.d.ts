/**
 * Created by xun on  2022/5/25 10:33.
 * description: bing.d
 */
declare namespace BingCoverRes {
  interface Image {
    startdate: string;
    fullstartdate: string;
    enddate: string;
    url: string;
    urlbase: string;
    copyright: string;
    copyrightlink: string;
    title: string;
    quiz: string;
    wp: boolean;
    hsh: string;
    drk: number;
    top: number;
    bot: number;
    hs: any[];
  }

  interface Tooltips {
    loading: string;
    previous: string;
    next: string;
    walle: string;
    walls: string;
  }

  interface RootObj {
    images: Image[];
    tooltips: Tooltips;
  }
}
