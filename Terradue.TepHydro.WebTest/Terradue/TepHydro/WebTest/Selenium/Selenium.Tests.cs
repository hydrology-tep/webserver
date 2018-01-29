using System;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading;
using OpenQA.Selenium;
using NUnit.Framework;
using RelevantCodes.ExtentReports;
using System.IO;

namespace Terradue.TepHydro.WebTest {
    
    public class SeleniumTests {
        protected IWebDriver driver;
        protected StringBuilder verificationErrors;
        protected string baseURL;
        protected bool acceptNextAlert = true;
        protected ExtentReports extent;
        protected string testSuffix;

        private const string REPORTDIR = "report";
        private const string IMAGEDIR = "images";
        private const int TIMEOUT = 60;

        /// <summary>
        /// Setups the test.
        /// </summary>
        /// <param name="d">Driver</param>
        /// <param name="reportPath">Report path.</param>
        public void SetupTest(IWebDriver d, string reportTestSuffix) {
            baseURL = "https://tep-hydro-dev.terradue.com";
            verificationErrors = new StringBuilder();

            //driver
            driver = d;
            driver.Manage().Window.Size = new System.Drawing.Size(1024, 768);

            //reporting
            extent = new ExtentReports(REPORTDIR + "/ExtentReports.html", false);
            extent.Config().ReportHeadline("Terradue Tep Hydro webtests");
            extent.Config().ReportName("Webtests");
            testSuffix = reportTestSuffix != "" ? " (" + reportTestSuffix + ")" : "";
        }

        [TestFixtureTearDown]
        public void TeardownTest() {
            try {
                driver.Quit();
                extent.Flush();
            } catch (Exception) {
                // Ignore errors if unable to close the browser
            }
            Assert.AreEqual("", verificationErrors.ToString());
        }

        public void HomePageTest() {
            // starting test
            var test = extent.StartTest("HomePage test" + testSuffix, "Testing homepage elements").AssignCategory("HEP-RB-01","HEP-RB-02");
            try{
                driver.Navigate().GoToUrl(baseURL + "/#!");

                try {
                    WaitForText("Home", By.LinkText("Home"));
                    test.Log(LogStatus.Pass, "Menu display");
                } catch (Exception e) {
                    test.Log(LogStatus.Fail, "Menu display : <pre>" + e.Message + " : " + e.StackTrace + "</pre>");
                    throw;
                }

                try {
                    WaitForText("Loading news...", By.Id("news"), false);
                    test.Log(LogStatus.Pass, "News loaded");
                } catch (Exception e) {
                    test.Log(LogStatus.Fail, "News loaded : <pre>" + e.Message + " : " + e.StackTrace + "</pre>");
                    throw;
                }
                try {
                    WaitForText("Loading blog...", By.Id("blog"), false);
                    test.Log(LogStatus.Pass, "Blog loaded");
                } catch (Exception e) {
                    test.Log(LogStatus.Fail, "Blog loaded : <pre>" + e.Message + " : " + e.StackTrace + "</pre>");
                    throw;
                }
//                test.AddScreenCapture(this.CreateScreenshot(driver));
                //Test that carousel is loaded and turn
                try {
                    WaitForText("Our Community", By.CssSelector("div.item.active > div.carousel-caption > h3"));
                    test.Log(LogStatus.Pass, "Carousel loaded");
                } catch (Exception e) {
                    test.Log(LogStatus.Fail, "Carousel loaded : <pre>" + e.Message + " : " + e.StackTrace + "</pre>");
                    throw;
                }
                try {
                    WaitForText("A Collaborative Framework", By.CssSelector("div.item.active > div.carousel-caption > h3"));
                    test.Log(LogStatus.Pass, "Carousel rotation");
                } catch (Exception e) {
                    test.Log(LogStatus.Fail, "Carousel rotation : <pre>" + e.Message + " : " + e.StackTrace + "</pre>");
                    throw;
                }
    //            //Test that blog is loaded
    //            Assert.IsTrue(IsElementPresent(By.ClassName("blog")));
    //            test.Log(LogStatus.Pass, "Blog contains element");
    //
    //            //Test that news are loaded
    //            Assert.IsTrue(IsElementPresent(By.ClassName("news-tweet")) || IsElementPresent(By.ClassName("news-rss")));
                
            } catch (Exception e) {
                extent.EndTest(test);
                throw;
            }
            extent.EndTest(test);
        }

        public void PartnersPageTest() {
            var test = extent.StartTest("Partners Page test" + testSuffix, "Testing partners elements");
            try{
                driver.Navigate().GoToUrl(baseURL + "/#!pages/partners");

                try {
                    WaitForElement(By.TagName("h3"));
                    test.Log(LogStatus.Pass, "Partners page loaded");
                } catch (Exception e) {
                    test.Log(LogStatus.Fail, "Partners page loaded : <pre>" + e.Message + " : " + e.StackTrace + "</pre>");
                    throw;
                }
//                test.AddScreenCapture(this.CreateScreenshot(driver));
                try {
                    Assert.IsTrue(driver.FindElements(By.TagName("h3")).Count == 7);
                    test.Log(LogStatus.Pass, "All Partners description loaded");
                } catch (Exception e) {
                    test.Log(LogStatus.Fail, "All Partners description loaded : <pre>" + e.Message + " : " + e.StackTrace + "</pre>");
                    throw;
                }
            } catch (Exception e) {
                extent.EndTest(test);
                throw;
            }
            extent.EndTest(test);
        }

        private void WaitForText(string text, By by, bool present = true) {
            for (int second = 0;; second++) {
                if (second >= TIMEOUT) Assert.Fail("timeout");
                try {
                    if (present) {
                        if (text == driver.FindElement(by).Text) break;
                    } else {
                        if (text != driver.FindElement(by).Text) break;
                    }
                } catch (Exception) {
                }
                Thread.Sleep(1000);
            }
        }

        private void WaitForElement(By by) {
            for (int second = 0;; second++) {
                if (second >= TIMEOUT) Assert.Fail("timeout");
                try {
                    if (driver.FindElement(by) != null) break;
                } catch (Exception) {
                }
                Thread.Sleep(1000);
            }
        }

        private bool IsElementPresent(By by) {
            try {
                driver.FindElement(by);
                return true;
            } catch (NoSuchElementException) {
                return false;
            }
        }

        private bool IsAlertPresent() {
            try {
                driver.SwitchTo().Alert();
                return true;
            } catch (NoAlertPresentException) {
                return false;
            }
        }

        private string CloseAlertAndGetItsText() {
            try {
                IAlert alert = driver.SwitchTo().Alert();
                string alertText = alert.Text;
                if (acceptNextAlert) {
                    alert.Accept();
                } else {
                    alert.Dismiss();
                }
                return alertText;
            } finally {
                acceptNextAlert = true;
            }
        }


        private String CreateScreenshot(IWebDriver driver) {

            string uuid = Guid.NewGuid().ToString();

            // generate screenshot as a file object
            ((ITakesScreenshot)driver).GetScreenshot().SaveAsFile(REPORTDIR + "/" + IMAGEDIR + "/" + uuid + ".png", System.Drawing.Imaging.ImageFormat.Png);
            return IMAGEDIR + "/" + uuid + ".png";
        }
    }
}
