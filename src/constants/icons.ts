import activity from '~/assets/icons/Activity.svg';
import attachment from '~/assets/icons/Attachment.svg';
import bell from '~/assets/icons/Bell.svg';
import calendar from '~/assets/icons/Calendar.svg';
import call from '~/assets/icons/Call.svg';
import chat from '~/assets/icons/Chat.svg';
import clock from '~/assets/icons/Clock.svg';
import dots from '~/assets/icons/Dots.svg';
import dropdown from '~/assets/icons/Dropdown.svg';
import email from '~/assets/icons/Email.svg';
import family from '~/assets/icons/Family.svg';
import finance from '~/assets/icons/Finance.svg';
import food from '~/assets/icons/Food.svg';
import gear from '~/assets/icons/Gear.svg';
import home from '~/assets/icons/Home.svg';
import print from '~/assets/icons/Print.svg';
import quote from '~/assets/icons/Quote.svg';
import search from '~/assets/icons/Search.svg';
import sent from '~/assets/icons/Sent.svg';
import student from '~/assets/icons/Student.svg';
import teacher from '~/assets/icons/Teacher.svg';
import trending from '~/assets/icons/Trending.svg';
import user from '~/assets/icons/User.svg';
import video from '~/assets/icons/Video.svg';
import checkSuccess from '~/assets/icons/CheckSuccess.svg';
import error from '~/assets/icons/Error.svg';
import warning from '~/assets/icons/Warning.svg';
import info from '~/assets/icons/Info.svg';
import xmark from '~/assets/icons/Xmark.svg';
import plus from '~/assets/icons/Plus.svg';

const loadSvg = async (path: string) => {
    try {
        const response = await fetch(path);
        const svg = await response.text();
        return svg;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const [
    activityIcon,
    attachmentIcon,
    bellIcon,
    calendarIcon,
    callIcon,
    chatIcon,
    clockIcon,
    dotsIcon,
    dropdownIcon,
    emailIcon,
    familyIcon,
    financeIcon,
    foodIcon,
    gearIcon,
    homeIcon,
    printIcon,
    quoteIcon,
    searchIcon,
    sentIcon,
    studentIcon,
    teacherIcon,
    trendingIcon,
    userIcon,
    videoIcon,
    checkSuccessIcon,
    errorIcon,
    warningIcon,
    infoIcon,
    xmarkIcon,
    plusIcon,
] = (await Promise.all([
    loadSvg(activity),
    loadSvg(attachment),
    loadSvg(bell),
    loadSvg(calendar),
    loadSvg(call),
    loadSvg(chat),
    loadSvg(clock),
    loadSvg(dots),
    loadSvg(dropdown),
    loadSvg(email),
    loadSvg(family),
    loadSvg(finance),
    loadSvg(food),
    loadSvg(gear),
    loadSvg(home),
    loadSvg(print),
    loadSvg(quote),
    loadSvg(search),
    loadSvg(sent),
    loadSvg(student),
    loadSvg(teacher),
    loadSvg(trending),
    loadSvg(user),
    loadSvg(video),
    loadSvg(checkSuccess),
    loadSvg(error),
    loadSvg(warning),
    loadSvg(info),
    loadSvg(xmark),
    loadSvg(plus),
]));

