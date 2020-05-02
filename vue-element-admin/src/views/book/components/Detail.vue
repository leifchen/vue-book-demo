<template>
  <el-form
    ref="postForm"
    :model="postForm"
    class="detail"
  >
    <sticky
      :z-index="10"
      :class-name="'sub-navbar ' + postForm.status"
    >
      <el-button
        v-if="!isEdit"
        @click.prevent.stop="showGuide"
      >显示帮助</el-button>
      <el-button
        v-loading="loading"
        style="margin-left: 10px;"
        type="success"
        @click="submitForm"
      >
        {{ isEdit ? '编辑电子书' : '新增电子书' }}
      </el-button>
    </sticky>
    <div class="detail-container">
      <el-row>
        <warning />
        <el-col :span="24">
          <ebook-upload
            :file-list="fileList"
            :disabled="isEdit"
            @onSuccess="onUploadSuccess"
            @onRemove="onUploadRemove"
          />
        </el-col>
        <el-col :span="24">
          <el-form-item
            style="margin-bottom: 40px;"
            prop="title"
          >
            <MDinput
              v-model="postForm.title"
              :maxlength="100"
              name="name"
              required
            >
              书名
            </MDinput>
          </el-form-item>
          <div>
            <el-row>
              <el-col
                :span="12"
                class="form-item-author"
              >
                <el-form-item
                  :label-width="labelWidth"
                  label="作者："
                >
                  <el-input
                    v-model="postForm.author"
                    placeholder="作者"
                    style="width: 100%"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item
                  :label-width="labelWidth"
                  label="出版社："
                >
                  <el-input
                    v-model="postForm.publisher"
                    placeholder="出版社"
                    style="width: 100%"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item
                  :label-width="labelWidth"
                  label="语言："
                >
                  <el-input
                    v-model="postForm.language"
                    placeholder="语言"
                    style="width: 100%"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item
                  :label-width="labelWidth"
                  label="根文件："
                >
                  <el-input
                    v-model="postForm.rootFile"
                    placeholder="根文件"
                    style="width: 100%"
                    disabled
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item
                  :label-width="labelWidth"
                  label="文件路径："
                >
                  <el-input
                    v-model="postForm.filePath"
                    placeholder="文件路径"
                    style="width: 100%"
                    disabled
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item
                  :label-width="labelWidth"
                  label="解压路径："
                >
                  <el-input
                    v-model="postForm.unzipPath"
                    placeholder="解压路径"
                    style="width: 100%"
                    disabled
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item
                  :label-width="labelWidth"
                  label="封面路径："
                >
                  <el-input
                    v-model="postForm.coverPath"
                    placeholder="封面路径"
                    style="width: 100%"
                    disabled
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item
                  :label-width="labelWidth"
                  label="文件名称："
                >
                  <el-input
                    v-model="postForm.fileName"
                    placeholder="文件名称"
                    style="width: 100%"
                    disabled
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item
                  :label-width="labelWidth"
                  label="封面："
                >
                  <a
                    v-if="postForm.cover"
                    :href="postForm.cover"
                    target="_blank"
                  >
                    <img
                      :src="postForm.cover"
                      class="preview-img"
                    >
                  </a>
                  <span v-else>无</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item
                  :label-width="labelWidth"
                  label="目录："
                >
                  <div
                    v-if="postForm.contents && postForm.contents.length > 0"
                    class="contents-wrapper"
                  >
                    <el-tree
                      :data="contentsTree"
                      @node-click="onContentClick"
                    />
                  </div>
                  <span v-else>无</span>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
    </div>
  </el-form>
</template>

<script>
import Sticky from '@/components/Sticky'
import Warning from './Warning'
import EbookUpload from '@/components/Upload/EbookUpload'
import MDinput from '@/components/MDinput'

const defaultForm = {
  title: '', // 书名
  author: '', // 作者
  publisher: '', // 出版社
  language: '', // 语种
  rootFile: '', // 根文件路径
  cover: '', // 封面图片URL
  coverPath: '', // 封面图片路径
  fileName: '', // 文件名
  originalName: '', // 文件原始名称
  filePath: '', // 文件所在路径
  unzipPath: '', // 解压文件所在路径
  contents: [] // 目录
}

export default {
  name: 'Detail',
  components: { Sticky, Warning, EbookUpload, MDinput },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      loading: false,
      postForm: Object.assign({}, defaultForm),
      fileList: [],
      labelWidth: '120px'
    }
  },
  methods: {
    submitForm() {
      this.loading = true
      setTimeout(() => {
        this.loading = false
      }, 200)
    },
    showGuide() {
      console.log('show guide...')
    },
    onUploadSuccess(data) {
      this.setData(data)
    },
    onUploadRemove() {
      this.toDefault()
    },
    onContentClick(data) {
      if (data.text) {
        window.open(data.text)
      }
    },
    setData(data) {
      const {
        title,
        author,
        publisher,
        language,
        rootFile,
        cover,
        originalName,
        url,
        contents,
        contentsTree,
        fileName,
        coverPath,
        filePath,
        unzipPath
      } = data
      this.postForm = {
        title,
        author,
        publisher,
        language,
        rootFile,
        cover,
        url,
        originalName,
        contents,
        fileName,
        coverPath,
        filePath,
        unzipPath
      }
      this.fileList = [{ name: originalName, url }]
      this.contentsTree = contentsTree
    },
    toDefault() {
      this.postForm = Object.assign({}, defaultForm)
      this.fileList = []
      this.contentsTree = []
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";

.detail {
  position: relative;
  .detail-container {
    padding: 40px 45px 20px 50px;
    .preview-img {
      width: 200px;
      height: 270px;
    }
    .contents-wrapper {
      padding: 5px 0;
    }
  }
}
</style>